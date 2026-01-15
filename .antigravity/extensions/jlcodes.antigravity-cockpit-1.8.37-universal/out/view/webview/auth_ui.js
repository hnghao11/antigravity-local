"use strict";(()=>{(function(){"use strict";let h=window.__i18n||{},a=d=>h[d]||d;class g{constructor(t){this.vscode=t,this.state={authorization:null,antigravityToolsSyncEnabled:!1,antigravityToolsAutoSwitchEnabled:!0},this.elements={}}updateState(t,e,c){this.state.authorization=t,e!==void 0&&(this.state.antigravityToolsSyncEnabled=e),c!==void 0&&(this.state.antigravityToolsAutoSwitchEnabled=c)}renderAuthRow(t,e={}){if(!t)return;let{authorization:c,antigravityToolsSyncEnabled:n}=this.state,o=c?.accounts||[],s=o.length>0,i=c?.activeAccount||(s?o[0].email:null),v=c?.isAuthorized||s,y=`<button class="quota-account-manage-btn" title="${a("autoTrigger.manageAccounts")}">${a("autoTrigger.manageAccounts")}</button>`,l="";if(e.showSyncToggleInline?l=`
                    <label class="antigravityTools-sync-toggle">
                        <input type="checkbox" class="at-sync-checkbox" ${n?"checked":""}>
                        <span>${a("autoTrigger.antigravityToolsSync")}</span>
                    </label>
                    <button class="at-btn at-btn-secondary at-import-btn">${a("autoTrigger.importFromAntigravityTools")}</button>
                `:l=`
                    <button class="at-btn at-btn-primary at-sync-config-btn" title="${a("atSyncConfig.title")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}">
                        \u2699 ${a("atSyncConfig.btnText")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}
                    </button>
                `,v&&i){let r=Math.max(o.length-1,0),m=r>0?`<span class="account-count-badge" title="${a("autoTrigger.manageAccounts")}">+${r}</span>`:"",b=`<button class="quota-account-manage-btn at-switch-to-client-btn" title="${a("autoTrigger.switchToClientAccount")}">${a("autoTrigger.switchToClientAccount")}</button>`;t.innerHTML=`
                    <div class="quota-auth-info quota-auth-info-clickable" title="${a("autoTrigger.manageAccounts")}">
                        <span class="quota-auth-icon">\u2705</span>
                        <span class="quota-auth-text">${a("autoTrigger.authorized")}</span>
                        <span class="quota-auth-email">${i}</span>
                        ${m}
                        ${y}
                        ${b}
                    </div>
                    <div class="quota-auth-actions">
                        ${l}
                    </div>
                 `}else t.innerHTML=`
                    <div class="quota-auth-info">
                        <span class="quota-auth-icon">\u26A0\uFE0F</span>
                        <span class="quota-auth-text">${a("autoTrigger.unauthorized")||"Unauthorized"}</span>
                    </div>
                    <div class="quota-auth-actions">
                        ${l}
                        <button class="at-btn at-btn-primary at-authorize-btn">${a("autoTrigger.authorizeBtn")||"Authorize"}</button>
                    </div>
                `;this._bindEvents(t)}_bindEvents(t){let e=c=>this.vscode.postMessage(c);t.querySelector(".quota-auth-info-clickable")?.addEventListener("click",()=>{this.openAccountManageModal()}),t.querySelector(".quota-account-manage-btn")?.addEventListener("click",c=>{c.stopPropagation(),this.openAccountManageModal()}),t.querySelector(".at-authorize-btn")?.addEventListener("click",()=>{this.openLoginChoiceModal()}),t.querySelector(".at-sync-config-btn")?.addEventListener("click",()=>{this.openSyncConfigModal()}),t.querySelector(".at-sync-checkbox")?.addEventListener("change",c=>{let n=c.target.checked;this.state.antigravityToolsSyncEnabled=n,e({command:"antigravityToolsSync.toggle",enabled:n})}),t.querySelector(".at-import-btn")?.addEventListener("click",()=>{e({command:"antigravityToolsSync.import"})}),t.querySelector(".at-switch-to-client-btn")?.addEventListener("click",c=>{c.stopPropagation(),e({command:"antigravityToolsSync.switchToClient"})})}openAccountManageModal(){let t=document.getElementById("account-manage-modal");t||(t=this._createModal("account-manage-modal",`
                    <div class="modal-content account-manage-content">
                        <div class="modal-header">
                            <h3>${a("autoTrigger.manageAccounts")||"Manage Accounts"}</h3>
                            <button class="close-btn" id="close-account-manage-modal">\xD7</button>
                        </div>
                        <div class="modal-body" id="account-manage-body"></div>
                        <div class="modal-footer">
                            <button id="add-new-account-btn" class="at-btn at-btn-primary">\u2795 ${a("autoTrigger.addAccount")||"Add Account"}</button>
                        </div>
                    </div>
                `),document.getElementById("close-account-manage-modal")?.addEventListener("click",()=>t.classList.add("hidden")),document.getElementById("add-new-account-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"autoTrigger.addAccount"})})),this.renderAccountManageList(),t.classList.remove("hidden")}renderAccountManageList(){let t=document.getElementById("account-manage-body");if(!t)return;let e=this.state.authorization?.accounts||[],c=this.state.authorization?.activeAccount;if(e.length===0){t.innerHTML=`<div class="account-manage-empty">${a("autoTrigger.noAccounts")||"No accounts authorized"}</div>`;return}t.innerHTML=`<div class="account-manage-list">${e.map(n=>{let o=n.email===c,s=n.isInvalid===!0,u=s?"\u26A0\uFE0F":o?"\u2705":"\u{1F464}",i=[o&&!s?`<span class="account-manage-badge">${a("autoTrigger.accountActive")}</span>`:"",s?`<span class="account-manage-badge expired">${a("autoTrigger.tokenExpired")}</span>`:""].join("");return`
                    <div class="account-manage-item ${o?"active":""} ${s?"expired":""}" data-email="${n.email}">
                        <div class="account-manage-info">
                            <span class="account-manage-icon">${u}</span>
                            <span class="account-manage-email">${n.email}</span>
                            ${i}
                        </div>
                        <div class="account-manage-actions">
                            <button class="at-btn at-btn-small at-btn-secondary account-reauth-btn" data-email="${n.email}">${a("autoTrigger.reauthorizeBtn")}</button>
                            <button class="at-btn at-btn-small at-btn-danger account-remove-btn" data-email="${n.email}">${a("autoTrigger.revokeBtn")}</button>
                        </div>
                    </div>
                `}).join("")}</div>`,t.querySelectorAll(".account-manage-item").forEach(n=>{n.addEventListener("click",o=>{if(o.target.tagName==="BUTTON"||o.target.closest("button")||n.classList.contains("active"))return;let s=n.dataset.email;s&&(this.vscode.postMessage({command:"autoTrigger.switchAccount",email:s}),document.getElementById("account-manage-modal")?.classList.add("hidden"))})}),t.querySelectorAll(".account-reauth-btn").forEach(n=>n.addEventListener("click",o=>{o.stopPropagation(),this.vscode.postMessage({command:"autoTrigger.reauthorizeAccount",email:n.dataset.email})})),t.querySelectorAll(".account-remove-btn").forEach(n=>n.addEventListener("click",o=>{o.stopPropagation(),typeof window.openRevokeModalForEmail=="function"?window.openRevokeModalForEmail(n.dataset.email):this.vscode.postMessage({command:"autoTrigger.removeAccount",email:n.dataset.email})}))}openSyncConfigModal(){let t=document.getElementById("at-sync-config-modal");t||(t=this._createModal("at-sync-config-modal",`
                    <div class="modal-content at-sync-config-content">
                        <div class="modal-header">
                        <h3>\u2699 ${a("atSyncConfig.title")||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</h3>
                            <button class="close-btn" id="close-at-sync-config-modal">\xD7</button>
                        </div>
                        <div class="modal-body at-sync-config-body">
                            <div class="at-sync-section at-sync-info-section">
                                <details class="at-sync-details at-sync-info-details">
                                    <summary class="at-sync-details-summary">
                                        <div class="at-sync-section-title-row">
                                            <div class="at-sync-section-title">\u2139\uFE0F ${a("atSyncConfig.featureTitle")||"\u529F\u80FD\u8BF4\u660E"}</div>
                                            <span class="at-sync-details-link">
                                                ${a("atSyncConfig.dataAccessDetails")||"\u5C55\u5F00\u8BE6\u60C5\u8BF4\u660E"}
                                            </span>
                                        </div>
                                        <div class="at-sync-description at-sync-info-summary">${a("atSyncConfig.featureSummary")||"\u67E5\u770B\u6570\u636E\u8BBF\u95EE\u4E0E\u540C\u6B65/\u5BFC\u5165\u89C4\u5219\u3002"}</div>
                                    </summary>
                                    <div class="at-sync-details-body">
                                        <div class="at-sync-info-block">
                                            <div class="at-sync-info-subtitle">\u{1F6E1}\uFE0F ${a("atSyncConfig.dataAccessTitle")||"\u6570\u636E\u8BBF\u95EE\u8BF4\u660E"}</div>
                                            <div class="at-sync-description">${a("atSyncConfig.dataAccessDesc")||"\u672C\u529F\u80FD\u4F1A\u8BFB\u53D6\u60A8\u672C\u5730 Antigravity Tools \u4E0E Antigravity \u5BA2\u6237\u7AEF\u7684\u8D26\u6237\u4FE1\u606F\uFF0C\u4EC5\u7528\u4E8E\u672C\u63D2\u4EF6\u6388\u6743/\u5207\u6362\u3002"}</div>
                                            <div class="at-sync-path-info">
                                                <span class="at-sync-path-label">${a("atSyncConfig.readPathTools")||"Antigravity Tools \u8DEF\u5F84"}:</span>
                                                <code class="at-sync-path">~/.antigravity_tools/</code>
                                            </div>
                                            <div class="at-sync-path-info">
                                                <span class="at-sync-path-label">${a("atSyncConfig.readPathLocal")||"Antigravity \u5BA2\u6237\u7AEF\u8DEF\u5F84"}:</span>
                                                <code class="at-sync-path">.../Antigravity/User/globalStorage/state.vscdb</code>
                                            </div>
                                            <div class="at-sync-data-list">
                                                <span class="at-sync-data-label">${a("atSyncConfig.readData")||"\u8BFB\u53D6\u5185\u5BB9"}:</span>
                                                <span class="at-sync-data-items">${a("atSyncConfig.readDataItems")||"\u8D26\u6237\u90AE\u7BB1\u3001Refresh Token\uFF08\u672C\u5730\u8BFB\u53D6\uFF09"}</span>
                                            </div>
                                        </div>
                                        <div class="at-sync-info-block">
                                            <div class="at-sync-info-line">
                                                <span class="at-sync-info-label">${a("atSyncConfig.autoSyncTitle")||"\u81EA\u52A8\u540C\u6B65"}\uFF1A</span>
                                                <span class="at-sync-info-text">${a("atSyncConfig.autoSyncDesc")||"\u542F\u7528\u540E\u68C0\u6D4B\u5230 Antigravity Tools \u65B0\u8D26\u53F7\u65F6\u81EA\u52A8\u5BFC\u5165\uFF08\u662F\u5426\u5207\u6362\u7531\u201C\u81EA\u52A8\u5207\u6362\u201D\u63A7\u5236\uFF09\u3002"}</span>
                                            </div>
                                            <div class="at-sync-info-line">
                                                <span class="at-sync-info-label">${a("atSyncConfig.autoSwitchTitle")||"\u81EA\u52A8\u5207\u6362"}\uFF1A</span>
                                                <span class="at-sync-info-text">${a("atSyncConfig.autoSwitchDesc")||"\u542F\u7528\u540E\u4F18\u5148\u5207\u6362\u5230 Antigravity Tools \u5F53\u524D\u8D26\u53F7\uFF1B\u4E0D\u53EF\u7528\u5219\u8DDF\u968F\u672C\u5730\u5BA2\u6237\u7AEF\u8D26\u53F7\uFF08\u4EC5\u6388\u6743\u6A21\u5F0F\u751F\u6548\uFF09\u3002"}</span>
                                            </div>
                                            <div class="at-sync-info-line">
                                                <span class="at-sync-info-label">${a("atSyncConfig.manualImportTitle")||"\u624B\u52A8\u5BFC\u5165"}\uFF1A</span>
                                                <span class="at-sync-info-text">${a("atSyncConfig.manualImportDesc")||"\u5206\u522B\u5BFC\u5165\u672C\u5730\u8D26\u6237\u6216 Antigravity Tools \u8D26\u6237\uFF0C\u4EC5\u6267\u884C\u4E00\u6B21\u3002"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                        </div>
                        <div class="at-sync-section">
                            <div class="at-sync-toggle-grid">
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-checkbox">
                                        <span>${a("atSyncConfig.enableAutoSync")||"\u81EA\u52A8\u540C\u6B65Antigravity Tools\u8D26\u6237"}</span>
                                    </label>
                                </div>
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-switch-checkbox">
                                        <span>${a("atSyncConfig.enableAutoSwitch")||"\u81EA\u52A8\u5207\u6362\u8D26\u6237"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                            <div class="at-sync-section">
                                <div class="at-sync-section-title">\u{1F4E5} ${a("atSyncConfig.manualImportTitle")||"\u624B\u52A8\u5BFC\u5165"}</div>
                                <div class="at-sync-import-actions">
                                    <button id="at-sync-modal-import-local-btn" class="at-btn at-btn-primary at-sync-import-btn">${a("atSyncConfig.importLocal")||"\u5BFC\u5165\u672C\u5730\u8D26\u6237"}</button>
                                    <button id="at-sync-modal-import-tools-btn" class="at-btn at-btn-primary at-sync-import-btn">${a("atSyncConfig.importTools")||"\u5BFC\u5165 Antigravity Tools \u8D26\u6237"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `),document.getElementById("close-at-sync-config-modal")?.addEventListener("click",()=>t.classList.add("hidden")),t.querySelector("#at-sync-modal-checkbox")?.addEventListener("change",n=>{this.state.antigravityToolsSyncEnabled=n.target.checked,this.vscode.postMessage({command:"antigravityToolsSync.toggle",enabled:n.target.checked})}),t.querySelector("#at-sync-modal-switch-checkbox")?.addEventListener("change",n=>{this.state.antigravityToolsAutoSwitchEnabled=n.target.checked,this.vscode.postMessage({command:"antigravityToolsSync.toggleAutoSwitch",enabled:n.target.checked})}),t.querySelector("#at-sync-modal-import-local-btn")?.addEventListener("click",()=>{typeof window.showLocalAuthImportLoading=="function"&&window.showLocalAuthImportLoading(),this.vscode.postMessage({command:"autoTrigger.importLocal"}),t.classList.add("hidden")}),t.querySelector("#at-sync-modal-import-tools-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"antigravityToolsSync.import"}),t.classList.add("hidden")}));let e=t.querySelector("#at-sync-modal-checkbox");e&&(e.checked=this.state.antigravityToolsSyncEnabled);let c=t.querySelector("#at-sync-modal-switch-checkbox");c&&(c.checked=this.state.antigravityToolsAutoSwitchEnabled),t.querySelectorAll(".at-sync-details").forEach(n=>{n.removeAttribute("open")}),t.classList.remove("hidden")}openLoginChoiceModal(){let t=document.getElementById("auth-choice-modal");t||(t=this._createModal("auth-choice-modal",`
                    <div class="modal-content auth-choice-content">
                        <div class="modal-header">
                            <h3>${a("authChoice.title")||"\u9009\u62E9\u767B\u5F55\u65B9\u5F0F"}</h3>
                            <button class="close-btn" id="close-auth-choice-modal">\xD7</button>
                        </div>
                        <div class="modal-body auth-choice-body">
                            <div class="auth-choice-info">
                                <div class="auth-choice-desc">${a("authChoice.desc")||"\u8BF7\u9009\u62E9\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u6216\u6388\u6743\u767B\u5F55\u3002"}</div>
                                <div class="auth-choice-tip">${a("authChoice.tip")||"\u6388\u6743\u767B\u5F55\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\uFF1B\u672C\u5730\u8BFB\u53D6\u4EC5\u5BF9\u5F53\u524D\u673A\u5668\u751F\u6548\u3002"}</div>
                            </div>
                            <div class="auth-choice-grid">
                                <div class="auth-choice-card">
                                    <div class="auth-choice-header">
                                        <span class="auth-choice-icon">\u{1F5A5}\uFE0F</span>
                                        <div>
                                            <div class="auth-choice-title">${a("authChoice.localTitle")||"\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7"}</div>
                                            <div class="auth-choice-text">${a("authChoice.localDesc")||"\u8BFB\u53D6\u672C\u673A Antigravity \u5BA2\u6237\u7AEF\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u4E0D\u91CD\u65B0\u6388\u6743\uFF0C\u4EC5\u590D\u7528\u73B0\u6709\u6388\u6743\u3002"}</div>
                                        </div>
                                    </div>
                                    <button id="auth-choice-local-btn" class="at-btn at-btn-primary auth-choice-btn">
                                        ${a("authChoice.localBtn")||"\u8BFB\u53D6\u672C\u5730\u6388\u6743"}
                                    </button>
                                </div>
                                <div class="auth-choice-card">
                                    <div class="auth-choice-header">
                                        <span class="auth-choice-icon">\u{1F510}</span>
                                        <div>
                                            <div class="auth-choice-title">${a("authChoice.oauthTitle")||"\u6388\u6743\u767B\u5F55\uFF08\u4E91\u7AEF\u6388\u6743\uFF09"}</div>
                                            <div class="auth-choice-text">${a("authChoice.oauthDesc")||"\u901A\u8FC7 Google OAuth \u65B0\u6388\u6743\uFF0C\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\u573A\u666F\uFF0C\u53EF\u64A4\u9500\u3002"}</div>
                                        </div>
                                    </div>
                                    <button id="auth-choice-oauth-btn" class="at-btn at-btn-primary auth-choice-btn">
                                        ${a("authChoice.oauthBtn")||"\u53BB\u6388\u6743\u767B\u5F55"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `),document.getElementById("close-auth-choice-modal")?.addEventListener("click",()=>t.classList.add("hidden")),t.querySelector("#auth-choice-oauth-btn")?.addEventListener("click",()=>{this.vscode.postMessage({command:"autoTrigger.authorize"}),t.classList.add("hidden")}),t.querySelector("#auth-choice-local-btn")?.addEventListener("click",()=>{typeof window.showLocalAuthImportLoading=="function"&&window.showLocalAuthImportLoading(),this.vscode.postMessage({command:"autoTrigger.importLocal"}),t.classList.add("hidden")})),t.classList.remove("hidden")}_createModal(t,e){let c=document.createElement("div");return c.id=t,c.className="modal hidden",c.innerHTML=e,document.body.appendChild(c),c.addEventListener("click",n=>{n.target===c&&c.classList.add("hidden")}),c}}window.AntigravityAuthUI=g})();})();
