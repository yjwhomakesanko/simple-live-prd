// Pulse Planning - Core System

// --- Theme Management ---
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
    const saved = localStorage.getItem('pulse-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateIcon(saved);
  }
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pulse-theme', next);
    this.updateIcon(next);
  }
  updateIcon(theme) {
    this.shadowRoot.querySelector('button').innerHTML = theme === 'light' ? '🌙' : '☀️';
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: none; border: 1px solid var(--border-color);
          color: var(--text-primary); padding: 0.4rem;
          border-radius: 6px; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; transition: all 0.2s;
        }
        button:hover { background: var(--border-color); }
      </style>
      <button></button>
    `;
    this.shadowRoot.querySelector('button').onclick = () => this.toggle();
  }
}
customElements.define('theme-toggle', ThemeToggle);

// --- AI Chat Component ---
class PulseChat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.messages = [
      { role: 'ai', text: 'Pulse Planning 시스템에 오신 것을 환영합니다. 무엇을 도와드릴까요?' }
    ];
  }

  connectedCallback() {
    this.render();
  }

  addMessage(role, text) {
    this.messages.push({ role, text });
    this.render();
    this.scrollToBottom();
  }

  scrollToBottom() {
    const list = this.shadowRoot.querySelector('.message-list');
    list.scrollTop = list.scrollHeight;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; }
        .message-list { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .message { max-width: 85%; padding: 0.8rem 1rem; border-radius: 12px; font-size: 0.9rem; line-height: 1.5; }
        .message.user { align-self: flex-end; background: var(--accent-primary); color: white; border-bottom-right-radius: 2px; }
        .message.ai { align-self: flex-start; background: var(--bg-pane); border: 1px solid var(--border-color); border-bottom-left-radius: 2px; }
        .input-area { padding: 1.5rem; border-top: 1px solid var(--border-color); background: var(--bg-pane); }
        .input-wrapper { display: flex; gap: 0.5rem; background: var(--bg-secondary); border-radius: 8px; padding: 0.4rem; border: 1px solid var(--border-color); }
        input { flex: 1; background: none; border: none; color: var(--text-primary); padding: 0.5rem; font-family: inherit; outline: none; }
        button { background: var(--accent-primary); color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; }
      </style>
      <div class="message-list">
        ${this.messages.map(m => `
          <div class="message ${m.role}">${m.text}</div>
        `).join('')}
      </div>
      <div class="input-area">
        <div class="input-wrapper">
          <input type="text" placeholder="메시지를 입력하세요...">
          <button>SEND</button>
        </div>
      </div>
    `;
    const btn = this.shadowRoot.querySelector('button');
    const input = this.shadowRoot.querySelector('input');
    const send = () => {
      if (!input.value) return;
      this.addMessage('user', input.value);
      const val = input.value;
      input.value = '';
      setTimeout(() => {
        this.addMessage('ai', `'${val}'에 대한 영향 범위를 분석하고 기획안을 업데이트하고 있습니다...`);
      }, 600);
    };
    btn.onclick = send;
    input.onkeypress = (e) => e.key === 'Enter' && send();
  }
}
customElements.define('pulse-chat', PulseChat);

// --- Hierarchical Viewer Components ---
class PulseNode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.expanded = true;
  }

  static get observedAttributes() {
    return ['level', 'title', 'status'];
  }

  connectedCallback() {
    this.render();
  }

  toggle() {
    this.expanded = !this.expanded;
    this.render();
  }

  render() {
    const level = this.getAttribute('level') || '1';
    const title = this.getAttribute('title') || 'Untitled';
    const status = this.getAttribute('status') || 'Draft';
    const hasChildren = this.innerHTML.trim() !== '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin-left: ${level === '1' ? '0' : '1.5rem'}; border-left: 1px solid var(--border-color); padding-left: 1rem; margin-top: 0.5rem; }
        .node-header { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
        .node-header:hover { background: var(--bg-secondary); }
        .toggle-icon { font-size: 0.7rem; width: 12px; transition: transform 0.2s; transform: rotate(${this.expanded ? '90deg' : '0deg'}); }
        .level-tag { font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-primary); font-weight: 600; min-width: 24px; }
        .node-title { flex: 1; font-weight: ${level === '1' ? '700' : '500'}; font-size: ${level === '1' ? '1rem' : '0.9rem'}; }
        .status-badge { font-size: 0.65rem; padding: 0.1rem 0.4rem; border-radius: 4px; background: var(--bg-secondary); color: var(--text-secondary); border: 1px solid var(--border-color); }
        .status-badge.validated { background: var(--accent-success); color: white; border: none; }
        .children { display: ${this.expanded ? 'block' : 'none'}; padding-top: 0.2rem; }
      </style>
      <div class="node">
        <div class="node-header" id="header">
          <span class="toggle-icon">${hasChildren ? '▶' : ''}</span>
          <span class="level-tag">L${level}</span>
          <span class="node-title">${title}</span>
          <span class="status-badge ${status.toLowerCase()}">${status}</span>
        </div>
        <div class="children">
          <slot></slot>
        </div>
      </div>
    `;
    this.shadowRoot.getElementById('header').onclick = () => hasChildren && this.toggle();
  }
}
customElements.define('pulse-node', PulseNode);

class PulseViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; padding: 2rem; max-width: 900px; margin: 0 auto; }
        .viewer-header { margin-bottom: 2.5rem; }
        h2 { font-family: var(--font-sans); font-size: 1.8rem; margin-bottom: 0.5rem; }
        p { color: var(--text-secondary); font-size: 0.9rem; }
        .tree { display: flex; flex-direction: column; gap: 1.5rem; }
      </style>
      <div class="viewer-header">
        <h2>System Architecture</h2>
        <p>기계 가독성을 갖춘 기획 데이터 구조 (L1 - L4)</p>
      </div>
      <div class="tree">
        <pulse-node level="1" title="결제 시스템 고도화" status="Validated">
          <pulse-node level="2" title="카카오페이 간편결제 추가" status="Draft">
            <pulse-node level="3" title="API 스펙 정의" status="Draft">
              <pulse-node level="4" title="결제 수단 선택 UI Flow" status="Draft"></pulse-node>
            </pulse-node>
            <pulse-node level="3" title="예외 케이스 처리" status="Draft">
              <pulse-node level="4" title="네트워크 오류 팝업" status="Draft"></pulse-node>
            </pulse-node>
          </pulse-node>
          <pulse-node level="2" title="정기 결제 시스템" status="Validated">
             <pulse-node level="3" title="구독 모델 관리" status="Validated"></pulse-node>
          </pulse-node>
        </pulse-node>

        <pulse-node level="1" title="사용자 경험 (UX) 최적화" status="Validated">
          <pulse-node level="2" title="반응형 레이아웃 강화" status="Validated">
            <pulse-node level="3" title="Container Queries 적용" status="Validated"></pulse-node>
          </pulse-node>
        </pulse-node>
      </div>
    `;
  }
}
customElements.define('pulse-viewer', PulseViewer);
