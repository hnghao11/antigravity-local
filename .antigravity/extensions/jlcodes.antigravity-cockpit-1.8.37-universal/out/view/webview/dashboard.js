"use strict";(()=>{(function(){"use strict";let u=window.__vscodeApi||(window.__vscodeApi=acquireVsCodeApi()),w=document.getElementById("dashboard"),ye=document.getElementById("status"),D=document.getElementById("refresh-btn"),we=document.getElementById("reset-order-btn"),ce=document.getElementById("toast"),le=document.getElementById("settings-modal"),F=document.getElementById("rename-modal"),be=document.getElementById("model-manager-modal"),Y=document.getElementById("model-manager-list"),Ce=document.getElementById("model-manager-count"),j=document.getElementById("quota-source-info"),n=window.__i18n||{},R=window.AntigravityAuthUI?window.__authUi||(window.__authUi=new window.AntigravityAuthUI(u)):null,Ee=!1,N=null,T={},q=null,Z=null,ee=[],Q=null,te=!1,C="local",O=!1,P=null,Le=!1,K=null,G=!1,V=!0,ne=[],de="",re=!1,H=!1,x=new Set,z=[],ke=10,Be=["Claude Opus 4.5 (Thinking)","Claude Sonnet 4.5","Claude Sonnet 4.5 (Thinking)","Gemini 3 Flash","Gemini 3 Pro (High)","Gemini 3 Pro (Low)","Gemini 3 Pro Image","GPT-OSS 120B (Medium)"],qe=["MODEL_PLACEHOLDER_M12","MODEL_CLAUDE_4_5_SONNET","MODEL_CLAUDE_4_5_SONNET_THINKING","MODEL_PLACEHOLDER_M18","MODEL_PLACEHOLDER_M7","MODEL_PLACEHOLDER_M8","MODEL_PLACEHOLDER_M9","MODEL_OPENAI_GPT_OSS_120B_MEDIUM"],ue=e=>(e||"").toLowerCase().replace(/[^a-z0-9]/g,""),xe=new Map(Be.map((e,t)=>[e,t])),Ne=new Map(qe.map((e,t)=>[e,t])),pt=new Map(Be.map((e,t)=>[ue(e),t])),gt=new Map(qe.map((e,t)=>[ue(e),t])),me=document.getElementById("custom-grouping-modal"),y={groups:[],allModels:[],groupMappings:{}};function ft(){let e=u.getState()||{};if(e.lastRefresh&&e.refreshCooldown){let I=Date.now(),M=Math.floor((I-e.lastRefresh)/1e3);M<e.refreshCooldown&&Ve(e.refreshCooldown-M)}e.quotaSource&&(C=e.quotaSource),D.addEventListener("click",Ge),ln(),we&&we.addEventListener("click",kt);let t=document.getElementById("manage-models-btn");t&&t.addEventListener("click",Ht);let o=document.getElementById("toggle-profile-btn");o&&o.addEventListener("click",$t);let a=document.getElementById("toggle-grouping-btn");a&&a.addEventListener("click",wt);let s=document.getElementById("settings-btn");s&&s.addEventListener("click",vt),document.querySelectorAll(".quota-source-btn").forEach(I=>{I.addEventListener("click",()=>{let M=I.dataset.source;oe(M)})});let l=document.getElementById("close-settings-btn");l&&l.addEventListener("click",Tt);let c=document.getElementById("close-rename-btn");c&&c.addEventListener("click",Re);let r=document.getElementById("save-rename-btn");r&&r.addEventListener("click",Pe);let d=document.getElementById("rename-input");d&&d.addEventListener("keydown",I=>{I.key==="Enter"&&Pe()}),document.getElementById("model-manager-close")?.addEventListener("click",$e),document.getElementById("model-manager-cancel")?.addEventListener("click",$e),document.getElementById("model-manager-save")?.addEventListener("click",Ut),document.getElementById("model-manager-select-all")?.addEventListener("click",()=>{je("all")}),document.getElementById("model-manager-clear")?.addEventListener("click",()=>{je("none")});let f=document.getElementById("reset-name-btn");f&&f.addEventListener("click",St);let p=document.getElementById("close-custom-grouping-btn");p&&p.addEventListener("click",Ae);let m=document.getElementById("cancel-custom-grouping-btn");m&&m.addEventListener("click",Ae);let h=document.getElementById("save-custom-grouping-btn");h&&h.addEventListener("click",an);let g=document.getElementById("smart-group-btn");g&&g.addEventListener("click",on);let v=document.getElementById("add-group-btn");v&&v.addEventListener("click",Jt);let E=document.getElementById("announcement-btn");E&&E.addEventListener("click",dt);let L=document.getElementById("announcement-list-close");L&&L.addEventListener("click",rt);let $=document.getElementById("announcement-mark-all-read");$&&$.addEventListener("click",fn);let k=document.getElementById("announcement-popup-later");k&&k.addEventListener("click",J);let B=document.getElementById("announcement-popup-got-it");B&&B.addEventListener("click",pn);let A=document.getElementById("announcement-popup-action");A&&A.addEventListener("click",gn),w.addEventListener("change",I=>{if(I.target.classList.contains("pin-toggle")){let M=I.target.getAttribute("data-model-id");M&&Ft(M)}}),window.addEventListener("message",Bt),ht(),Ue(C),u.postMessage({command:"init"})}function ht(){let e=document.querySelectorAll(".tab-btn"),t=document.querySelectorAll(".tab-content");e.forEach(o=>{o.addEventListener("click",()=>{let a=o.getAttribute("data-tab");e.forEach(s=>s.classList.remove("active")),o.classList.add("active"),t.forEach(s=>{s.id===`tab-${a}`?s.classList.add("active"):s.classList.remove("active")}),u.postMessage({command:"tabChanged",tab:a})})})}function vt(){if(le){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold");e&&(e.checked=T.notificationEnabled!==!1),t&&(t.value=T.warningThreshold||30),o&&(o.value=T.criticalThreshold||10);let a=document.getElementById("display-mode-select");if(a){let s=T.displayMode||"webview";a.value=s,a.onchange=()=>{a.value==="quickpick"&&u.postMessage({command:"updateDisplayMode",displayMode:"quickpick"})}}bt(),yt(),Et(),le.classList.remove("hidden")}}function yt(){let e=document.getElementById("statusbar-format");if(!e)return;let t=T.statusBarFormat||"standard";e.value=t,e.onchange=null,e.addEventListener("change",()=>{let o=e.value;u.postMessage({command:"updateStatusBarFormat",statusBarFormat:o})})}function bt(){let e=document.getElementById("language-select");if(!e)return;let t=T.language||"auto";e.value=t,e.onchange=null,e.addEventListener("change",()=>{let o=e.value;u.postMessage({command:"updateLanguage",language:o}),S(n["language.changed"]||"Language changed. Reopen panel to apply.","info")})}function Et(){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold");e&&(e.onchange=null,e.addEventListener("change",()=>{u.postMessage({command:"updateNotificationEnabled",notificationEnabled:e.checked})})),t&&(t.onblur=null,t.addEventListener("blur",()=>{De()})),o&&(o.onblur=null,o.addEventListener("blur",()=>{De()}))}function De(){let e=document.getElementById("warning-threshold"),t=document.getElementById("critical-threshold"),o=parseInt(e?.value,10)||30,a=parseInt(t?.value,10)||10;o<5&&(o=5),o>80&&(o=80),a<1&&(a=1),a>50&&(a=50),a>=o&&(a=o-1,a<1&&(a=1)),e&&(e.value=o),t&&(t.value=a),Lt()}function Lt(){let e=document.getElementById("notification-enabled"),t=document.getElementById("warning-threshold"),o=document.getElementById("critical-threshold"),a=e?.checked??!0,s=parseInt(t?.value,10)||30,i=parseInt(o?.value,10)||10;u.postMessage({command:"updateThresholds",notificationEnabled:a,warningThreshold:s,criticalThreshold:i})}function Tt(){le&&le.classList.add("hidden")}function It(e,t,o){if(F){Z=e,ee=o||[],te=!1,Q=null;let a=document.getElementById("rename-input");a&&(a.value=t||"",a.focus(),a.select()),F.classList.remove("hidden")}}function Mt(e,t,o){if(F){te=!0,Q=e,Z=null,ee=[],de=o||t||"";let a=document.getElementById("rename-input");a&&(a.value=t||"",a.focus(),a.select()),F.classList.remove("hidden")}}function Re(){F&&(F.classList.add("hidden"),Z=null,ee=[],Q=null,te=!1,de="")}function Pe(){let t=document.getElementById("rename-input")?.value?.trim();if(!t){S(n["model.nameEmpty"]||n["grouping.nameEmpty"]||"Name cannot be empty","error");return}te&&Q?(u.postMessage({command:"renameModel",modelId:Q,groupName:t}),S((n["model.renamed"]||"Model renamed to {name}").replace("{name}",t),"success")):Z&&ee.length>0&&(u.postMessage({command:"renameGroup",groupId:Z,groupName:t,modelIds:ee}),S((n["grouping.renamed"]||"Renamed to {name}").replace("{name}",t),"success")),Re()}function St(){let e=document.getElementById("rename-input");e&&te&&Q&&de&&(e.value=de,e.focus())}function $t(){u.postMessage({command:"toggleProfile"})}function At(){let e=document.getElementById("toggle-profile-btn");e&&(re?(e.textContent=(n["profile.planDetails"]||"Plan")+" \u25BC",e.classList.add("toggle-off")):(e.textContent=(n["profile.planDetails"]||"Plan")+" \u25B2",e.classList.remove("toggle-off")))}function wt(){u.postMessage({command:"toggleGrouping"})}function Ct(e){let t=document.getElementById("toggle-grouping-btn");t&&(e?(t.textContent=(n["grouping.title"]||"Groups")+" \u25B2",t.classList.remove("toggle-off")):(t.textContent=(n["grouping.title"]||"Groups")+" \u25BC",t.classList.add("toggle-off")))}function Ge(){if(D.disabled)return;Ee=!0,Ke(),S(n["notify.refreshing"]||"Refreshing quota data...","info"),u.postMessage({command:"refresh"});let e=Date.now();u.setState({...u.getState(),lastRefresh:e,refreshCooldown:ke}),Ve(ke)}function kt(){u.postMessage({command:"resetOrder"}),S(n["dashboard.resetOrder"]||"Reset Order","success")}function yn(){u.postMessage({command:"autoGroup"}),S(n["grouping.autoGroup"]||"Auto grouping...","info")}function Bt(e){let t=e.data;if(t.type==="switchTab"&&t.tab){Qe(t.tab);return}if(t.type==="telemetry_update"){if(Ee=!1,Ke(),t.config&&(T=t.config,t.config.profileHidden!==void 0&&(re=t.config.profileHidden,At()),t.config.quotaSource&&(!O||t.config.quotaSource===P)&&(C=t.config.quotaSource,u.setState({...u.getState(),quotaSource:C})),t.config.authorizedAvailable!==void 0&&(Le=t.config.authorizedAvailable),t.config.authorizationStatus!==void 0&&(K=t.config.authorizationStatus),Array.isArray(t.config.visibleModels)&&(ne=t.config.visibleModels),t.config.dataMasked!==void 0&&(H=t.config.dataMasked),t.config.antigravityToolsSyncEnabled!==void 0&&(G=t.config.antigravityToolsSyncEnabled),t.config.antigravityToolsAutoSwitchEnabled!==void 0&&(V=t.config.antigravityToolsAutoSwitchEnabled)),O){if(t.config?.quotaSource!==P){ge(t.data?.isConnected);return}Te(!1)}Qt(t.data,t.config),q=t.data,ge(t.data?.isConnected)}if(t.type==="autoTriggerState"&&t.data?.authorization!==void 0){K=t.data.authorization,Le=!!t.data.authorization?.isAuthorized,Me();let o=document.getElementById("account-manage-modal");o&&!o.classList.contains("hidden")&&((K?.accounts||[]).length===0?R?o.classList.add("hidden"):fe():R?R.renderAccountManageList():Oe())}if(t.type==="announcementState"&&hn(t.data),t.type==="quotaSourceError"&&(O&&(Te(!1),ge(q?.isConnected)),S(t.message||n["quotaSource.authorizedMissing"]||"Authorize auto wake-up first","warning")),t.type==="antigravityToolsSyncStatus"&&(t.data?.enabled!==void 0&&(G=t.data.enabled),t.data?.autoSyncEnabled!==void 0&&(G=t.data.autoSyncEnabled),t.data?.autoSwitchEnabled!==void 0&&(V=t.data.autoSwitchEnabled),Me()),t.type==="antigravityToolsSyncPrompt"){let o=t.data||{};Nt(o)}if(t.type==="localAuthImportPrompt"){let o=t.data||{};xt(o)}t.type==="localAuthImportError"&&ae(),t.type==="antigravityToolsSyncComplete"&&Dt(t.data?.success,t.data?.error)}function Te(e,t){O=e,e?(P=t||P,Ue(P)):(P=null,ye.style.display="none"),document.querySelectorAll(".quota-source-btn").forEach(a=>{let s=a.dataset.source;a.disabled=e&&s===P})}function oe(e,t={}){if(!e||!(t.force===!0)&&(!O&&e===C||O&&e===P))return;let a=t.command||"updateQuotaSource";Te(!0,e),C=e,ge(q?.isConnected),u.postMessage({command:a,quotaSource:e})}function bn(){let e=document.getElementById("antigravityTools-sync-checkbox"),t=document.getElementById("antigravityTools-import-btn");e?.addEventListener("change",o=>{let a=o.target.checked;G=a,u.postMessage({command:"antigravityToolsSync.toggle",enabled:a})}),t?.addEventListener("click",()=>{u.postMessage({command:"antigravityToolsSync.import"})})}function He(){let e=document.getElementById("at-sync-config-modal");e||(e=document.createElement("div"),e.id="at-sync-config-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content at-sync-config-content">
                    <div class="modal-header">
                        <h3>\u2699 ${n["atSyncConfig.title"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</h3>
                        <button class="close-btn" id="close-at-sync-config-modal">\xD7</button>
                    </div>
                    <div class="modal-body at-sync-config-body">
                        <!-- \u6570\u636E\u8BBF\u95EE\u8BF4\u660E -->
                        <div class="at-sync-section at-sync-info-section">
                            <details class="at-sync-details at-sync-info-details">
                                <summary class="at-sync-details-summary">
                                    <div class="at-sync-section-title-row">
                                        <div class="at-sync-section-title">\u2139\uFE0F ${n["atSyncConfig.featureTitle"]||"\u529F\u80FD\u8BF4\u660E"}</div>
                                        <span class="at-sync-details-link">
                                            ${n["atSyncConfig.dataAccessDetails"]||"\u5C55\u5F00\u8BE6\u60C5\u8BF4\u660E"}
                                        </span>
                                    </div>
                                    <div class="at-sync-description at-sync-info-summary">
                                        ${n["atSyncConfig.featureSummary"]||"\u67E5\u770B\u6570\u636E\u8BBF\u95EE\u4E0E\u540C\u6B65/\u5BFC\u5165\u89C4\u5219\u3002"}
                                    </div>
                                </summary>
                                <div class="at-sync-details-body">
                                    <div class="at-sync-info-block">
                                        <div class="at-sync-info-subtitle">\u{1F6E1}\uFE0F ${n["atSyncConfig.dataAccessTitle"]||"\u6570\u636E\u8BBF\u95EE\u8BF4\u660E"}</div>
                                        <div class="at-sync-description">
                                            ${n["atSyncConfig.dataAccessDesc"]||"\u672C\u529F\u80FD\u4F1A\u8BFB\u53D6\u60A8\u672C\u5730 Antigravity Tools \u4E0E Antigravity \u5BA2\u6237\u7AEF\u7684\u8D26\u6237\u4FE1\u606F\uFF0C\u4EC5\u7528\u4E8E\u672C\u63D2\u4EF6\u6388\u6743/\u5207\u6362\u3002"}
                                        </div>
                                        <div class="at-sync-path-info">
                                            <span class="at-sync-path-label">${n["atSyncConfig.readPathTools"]||"Antigravity Tools \u8DEF\u5F84"}:</span>
                                            <code class="at-sync-path">~/.antigravity_tools/</code>
                                        </div>
                                        <div class="at-sync-path-info">
                                            <span class="at-sync-path-label">${n["atSyncConfig.readPathLocal"]||"Antigravity \u5BA2\u6237\u7AEF\u8DEF\u5F84"}:</span>
                                            <code class="at-sync-path">.../Antigravity/User/globalStorage/state.vscdb</code>
                                        </div>
                                        <div class="at-sync-data-list">
                                            <span class="at-sync-data-label">${n["atSyncConfig.readData"]||"\u8BFB\u53D6\u5185\u5BB9"}:</span>
                                            <span class="at-sync-data-items">${n["atSyncConfig.readDataItems"]||"\u8D26\u6237\u90AE\u7BB1\u3001Refresh Token\uFF08\u672C\u5730\u8BFB\u53D6\uFF09"}</span>
                                        </div>
                                    </div>
                                    <div class="at-sync-info-block">
                                        <div class="at-sync-info-line">
                                            <span class="at-sync-info-label">${n["atSyncConfig.autoSyncTitle"]||"\u81EA\u52A8\u540C\u6B65"}\uFF1A</span>
                                            <span class="at-sync-info-text">${n["atSyncConfig.autoSyncDesc"]||"\u542F\u7528\u540E\u68C0\u6D4B\u5230 Antigravity Tools \u65B0\u8D26\u53F7\u65F6\u81EA\u52A8\u5BFC\u5165\uFF08\u662F\u5426\u5207\u6362\u7531\u201C\u81EA\u52A8\u5207\u6362\u201D\u63A7\u5236\uFF09\u3002"}</span>
                                        </div>
                                        <div class="at-sync-info-line">
                                            <span class="at-sync-info-label">${n["atSyncConfig.autoSwitchTitle"]||"\u81EA\u52A8\u5207\u6362"}\uFF1A</span>
                                            <span class="at-sync-info-text">${n["atSyncConfig.autoSwitchDesc"]||"\u542F\u7528\u540E\u4F18\u5148\u5207\u6362\u5230 Antigravity Tools \u5F53\u524D\u8D26\u53F7\uFF1B\u4E0D\u53EF\u7528\u5219\u8DDF\u968F\u672C\u5730\u5BA2\u6237\u7AEF\u8D26\u53F7\uFF08\u4EC5\u6388\u6743\u6A21\u5F0F\u751F\u6548\uFF09\u3002"}</span>
                                        </div>
                                        <div class="at-sync-info-line">
                                            <span class="at-sync-info-label">${n["atSyncConfig.manualImportTitle"]||"\u624B\u52A8\u5BFC\u5165"}\uFF1A</span>
                                            <span class="at-sync-info-text">${n["atSyncConfig.manualImportDesc"]||"\u5206\u522B\u5BFC\u5165\u672C\u5730\u8D26\u6237\u6216 Antigravity Tools \u8D26\u6237\uFF0C\u4EC5\u6267\u884C\u4E00\u6B21\u3002"}</span>
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>
                        
                        <!-- \u81EA\u52A8\u540C\u6B65 / \u81EA\u52A8\u5207\u6362 -->
                        <div class="at-sync-section">
                            <div class="at-sync-toggle-grid">
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-checkbox" ${G?"checked":""}>
                                        <span>${n["atSyncConfig.enableAutoSync"]||"\u81EA\u52A8\u540C\u6B65Antigravity Tools\u8D26\u6237"}</span>
                                    </label>
                                </div>
                                <div class="at-sync-toggle-card">
                                    <label class="at-sync-toggle-label">
                                        <input type="checkbox" id="at-sync-modal-switch-checkbox" ${V?"checked":""}>
                                        <span>${n["atSyncConfig.enableAutoSwitch"]||"\u81EA\u52A8\u5207\u6362\u8D26\u6237"}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- \u624B\u52A8\u5BFC\u5165 -->
                        <div class="at-sync-section">
                            <div class="at-sync-section-title">\u{1F4E5} ${n["atSyncConfig.manualImportTitle"]||"\u624B\u52A8\u5BFC\u5165"}</div>
                            <div class="at-sync-import-actions">
                                <button id="at-sync-modal-import-local-btn" class="at-btn at-btn-primary at-sync-import-btn">
                                    ${n["atSyncConfig.importLocal"]||"\u5BFC\u5165\u672C\u5730\u8D26\u6237"}
                                </button>
                                <button id="at-sync-modal-import-tools-btn" class="at-btn at-btn-primary at-sync-import-btn">
                                    ${n["atSyncConfig.importTools"]||"\u5BFC\u5165 Antigravity Tools \u8D26\u6237"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-at-sync-config-modal")?.addEventListener("click",pe),e.addEventListener("click",p=>{p.target===e&&pe()}));let t=e.querySelector("#at-sync-modal-checkbox");t&&(t.checked=G);let o=e.querySelector("#at-sync-modal-switch-checkbox");o&&(o.checked=V),e.querySelectorAll(".at-sync-details").forEach(p=>{p.removeAttribute("open")});let a=e.querySelector("#at-sync-modal-checkbox"),s=e.querySelector("#at-sync-modal-import-local-btn"),i=e.querySelector("#at-sync-modal-import-tools-btn"),l=e.querySelector("#at-sync-modal-switch-checkbox"),c=a.cloneNode(!0);a.parentNode.replaceChild(c,a);let r=s.cloneNode(!0);s.parentNode.replaceChild(r,s);let d=i.cloneNode(!0);i.parentNode.replaceChild(d,i);let f=l.cloneNode(!0);l.parentNode.replaceChild(f,l),e.querySelector("#at-sync-modal-checkbox")?.addEventListener("change",p=>{let m=p.target.checked;G=m,u.postMessage({command:"antigravityToolsSync.toggle",enabled:m})}),e.querySelector("#at-sync-modal-switch-checkbox")?.addEventListener("change",p=>{let m=p.target.checked;V=m,u.postMessage({command:"antigravityToolsSync.toggleAutoSwitch",enabled:m})}),e.querySelector("#at-sync-modal-import-local-btn")?.addEventListener("click",()=>{Ie(),u.postMessage({command:"autoTrigger.importLocal"}),pe()}),e.querySelector("#at-sync-modal-import-tools-btn")?.addEventListener("click",()=>{u.postMessage({command:"antigravityToolsSync.import"}),pe()}),e.classList.remove("hidden")}function pe(){let e=document.getElementById("at-sync-config-modal");e&&e.classList.add("hidden")}function qt(e){return!e||typeof e!="string"?"":e}function ze(){let e=document.getElementById("local-auth-import-modal");return e||(e=document.createElement("div"),e.id="local-auth-import-modal",e.className="modal hidden",document.body.appendChild(e)),e}function _e(e){e.onclick=t=>{t.target===e&&ae()},e.querySelector("#close-local-import-modal")?.addEventListener("click",ae)}function Ie(){let e=ze();e.innerHTML=`
            <div class="modal-content local-import-content">
                <div class="modal-header">
                    <h3>${n["localImportPrompt.loadingTitle"]||"\u6B63\u5728\u68C0\u6D4B\u672C\u5730\u6388\u6743"}</h3>
                    <button class="close-btn" id="close-local-import-modal">\xD7</button>
                </div>
                <div class="modal-body local-import-body">
                    <div class="local-import-panel">
                        <div class="local-import-desc">${n["localImportPrompt.loadingDesc"]||"\u6B63\u5728\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u5019\u2026"}</div>
                        <div class="local-import-loading">
                            <span class="local-import-spinner"></span>
                            <span>${n["localImportPrompt.loadingHint"]||"\u6B63\u5728\u68C0\u6D4B\u672C\u5730\u6388\u6743\u8D26\u53F7"}</span>
                        </div>
                    </div>
                </div>
            </div>
        `,_e(e),e.classList.remove("hidden")}function xt(e){let t=typeof e.email=="string"?e.email:"",o=e.exists===!0,a=qt(t),s=ze();s.innerHTML=`
            <div class="modal-content local-import-content">
                <div class="modal-header">
                    <h3>${n["localImportPrompt.title"]||"\u786E\u8BA4\u540C\u6B65\u672C\u5730\u6388\u6743"}</h3>
                    <button class="close-btn" id="close-local-import-modal">\xD7</button>
                </div>
                <div class="modal-body local-import-body">
                    <div class="local-import-panel">
                        <div class="local-import-desc">${n["localImportPrompt.desc"]||"\u5DF2\u68C0\u6D4B\u5230\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u662F\u5426\u540C\u6B65\u5230\u63D2\u4EF6\u4E2D\uFF1F"}</div>
                        <div class="local-import-summary">
                            <div class="local-import-label">${n["localImportPrompt.foundLabel"]||"\u68C0\u6D4B\u5230\u8D26\u53F7"}</div>
                            <div class="local-import-email" id="local-import-email"></div>
                            <span class="local-import-tag" id="local-import-tag">${n["localImportPrompt.existsTag"]||"\u5DF2\u5B58\u5728"}</span>
                        </div>
                        <div class="local-import-note" id="local-import-note"></div>
                    </div>
                    <div class="local-import-actions">
                        <button id="local-import-cancel-btn" class="at-btn at-btn-outline">${n["localImportPrompt.cancel"]||"\u53D6\u6D88"}</button>
                        <button id="local-import-confirm-btn" class="at-btn at-btn-primary"></button>
                    </div>
                </div>
            </div>
        `,_e(s);let i=s.querySelector("#local-import-email"),l=s.querySelector("#local-import-tag"),c=s.querySelector("#local-import-note"),r=s.querySelector("#local-import-confirm-btn"),d=s.querySelector("#local-import-cancel-btn");i&&(i.textContent=a||n["localImportPrompt.unknownEmail"]||"\u672A\u77E5\u8D26\u53F7"),l&&(l.style.display=o?"inline-flex":"none"),c&&(c.textContent=o?n["localImportPrompt.existsDesc"]||"\u8BE5\u8D26\u53F7\u5DF2\u5B58\u5728\uFF0C\u7EE7\u7EED\u5C06\u8986\u76D6\u672C\u5730\u4FDD\u5B58\u7684\u6388\u6743\u4FE1\u606F\u3002":n["localImportPrompt.newDesc"]||"\u5C06\u5BFC\u5165\u5E76\u5207\u6362\u4E3A\u8BE5\u8D26\u53F7\u3002");let f=o?n["localImportPrompt.overwrite"]||"\u8986\u76D6\u5E76\u540C\u6B65":n["localImportPrompt.confirm"]||"\u786E\u8BA4\u540C\u6B65";if(r&&(r.textContent=f),r&&r.parentNode&&d&&d.parentNode){let p=r.cloneNode(!0);r.parentNode.replaceChild(p,r);let m=d.cloneNode(!0);d.parentNode.replaceChild(m,d),s.querySelector("#local-import-confirm-btn")?.addEventListener("click",()=>{u.postMessage({command:"autoTrigger.importLocalConfirm",overwrite:o}),ae()}),s.querySelector("#local-import-cancel-btn")?.addEventListener("click",()=>{ae()})}s.classList.remove("hidden")}function ae(){let e=document.getElementById("local-auth-import-modal");e&&e.classList.add("hidden")}function Nt(e){let t=e.promptType||"new_accounts",o=e.newEmails||[],a=e.currentEmail||"",s=e.localEmail||"",i=e.autoConfirm===!0,l=e.autoConfirmImportOnly===!0,c=document.getElementById("antigravityTools-sync-modal");if(c||(c=document.createElement("div"),c.id="antigravityTools-sync-modal",c.className="modal hidden",document.body.appendChild(c)),t==="not_found"){c.innerHTML=`
                <div class="modal-content antigravityTools-sync-content">
                    <div class="modal-header antigravityTools-sync-header">
                        <div class="antigravityTools-sync-title">
                            <h3>${n["antigravityToolsSync.notFoundTitle"]}</h3>
                        </div>
                        <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                    </div>
                    <div class="modal-body antigravityTools-sync-body">
                        <div class="antigravityTools-sync-section">
                            <p class="antigravityTools-sync-notice">${n["antigravityToolsSync.notFoundDesc"]}</p>
                        </div>
                    </div>
                    <div class="modal-footer antigravityTools-sync-footer">
                        <button id="antigravityTools-sync-ok" class="at-btn at-btn-primary">${n["common.gotIt"]}</button>
                    </div>
                </div>
            `,c.classList.remove("hidden"),c.querySelector("#antigravityTools-sync-close")?.addEventListener("click",()=>{c.classList.add("hidden")}),c.querySelector("#antigravityTools-sync-ok")?.addEventListener("click",()=>{c.classList.add("hidden")});return}if(t==="switch_only"){let A=function(){L&&(clearTimeout(L),L=null)},I=function(){A(),B.disabled=!0,k.disabled=!0,$.disabled=!0,B.textContent=n["autoTrigger.switching"],u.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!1,switchOnly:!0,targetEmail:a})};c.innerHTML=`
                <div class="modal-content antigravityTools-sync-content">
                    <div class="modal-header antigravityTools-sync-header">
                        <div class="antigravityTools-sync-title">
                            <h3>${n["antigravityToolsSync.switchTitle"]}</h3>
                        </div>
                        <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                    </div>
                    <div class="modal-body antigravityTools-sync-body">
                        <div class="antigravityTools-sync-section">
                            <div class="antigravityTools-sync-label">${n["antigravityToolsSync.localAccount"]}</div>
                             <div class="antigravityTools-sync-current">${s||n["common.none"]}</div>
                        </div>
                        <div class="antigravityTools-sync-section">
                            <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncTarget"]}</div>
                            <div class="antigravityTools-sync-current antigravityTools-sync-highlight">${a}</div>
                        </div>
                    </div>
                    <div class="modal-footer antigravityTools-sync-footer">
                        <button id="antigravityTools-sync-cancel" class="at-btn at-btn-secondary">${n["common.cancel"]}</button>
                        <button id="antigravityTools-sync-switch" class="at-btn at-btn-primary">${n["antigravityToolsSync.switchBtn"]}</button>
                    </div>
                </div>
            `,c.classList.remove("hidden");let L=null,$=c.querySelector("#antigravityTools-sync-close"),k=c.querySelector("#antigravityTools-sync-cancel"),B=c.querySelector("#antigravityTools-sync-switch");$?.addEventListener("click",()=>{A(),c.classList.add("hidden")}),k?.addEventListener("click",()=>{A(),c.classList.add("hidden")}),B?.addEventListener("click",I),i&&(L=setTimeout(()=>I(),300));return}c.innerHTML=`
            <div class="modal-content antigravityTools-sync-content">
                <div class="modal-header antigravityTools-sync-header">
                    <div class="antigravityTools-sync-title">
                        <h3>${n["autoTrigger.antigravityToolsSyncTitle"]}</h3>
                        <span class="antigravityTools-sync-count" id="antigravityTools-sync-count">+${o.length}</span>
                    </div>
                    <button class="close-btn" id="antigravityTools-sync-close">\xD7</button>
                </div>
                <div class="modal-body antigravityTools-sync-body">
                    <div class="antigravityTools-sync-section">
                        <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncNew"]}</div>
                        <div class="antigravityTools-sync-chips">${o.map(L=>`<span class="antigravityTools-sync-chip">${L}</span>`).join("")}</div>
                    </div>
                    <div class="antigravityTools-sync-section">
                        <div class="antigravityTools-sync-label">${n["autoTrigger.antigravityToolsSyncTarget"]}</div>
                        <div class="antigravityTools-sync-current">${a||n["common.unknown"]}</div>
                    </div>
                </div>
                <div class="modal-footer antigravityTools-sync-footer">
                    <button id="antigravityTools-sync-cancel" class="at-btn at-btn-secondary">${n["common.cancel"]}</button>
                    <div class="antigravityTools-sync-action-group">
                        <button id="antigravityTools-sync-import-only" class="at-btn at-btn-secondary">${n["autoTrigger.importOnly"]}</button>
                        <button id="antigravityTools-sync-import-switch" class="at-btn at-btn-primary">${n["autoTrigger.importAndSwitch"]}</button>
                    </div>
                </div>
            </div>
        `,c.classList.remove("hidden");let r=null,d=c.querySelector("#antigravityTools-sync-close"),f=c.querySelector("#antigravityTools-sync-cancel"),p=c.querySelector("#antigravityTools-sync-import-only"),m=c.querySelector("#antigravityTools-sync-import-switch");function h(){r&&(clearTimeout(r),r=null)}function g(L){h(),p&&(p.disabled=!0),m&&(m.disabled=!0),f&&(f.disabled=!0),d&&(d.disabled=!0),L&&(L.textContent=n["autoTrigger.importing"])}function v(){g(p),u.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!0})}function E(){g(m),u.postMessage({command:"antigravityToolsSync.importConfirm",importOnly:!1})}d?.addEventListener("click",()=>{h(),c.classList.add("hidden")}),f?.addEventListener("click",()=>{h(),c.classList.add("hidden")}),p?.addEventListener("click",v),m?.addEventListener("click",E),i&&(r=setTimeout(()=>{l?v():E()},300))}function Dt(e,t){let o=document.getElementById("antigravityTools-sync-modal");o&&o.classList.add("hidden")}function ge(e){let t=document.querySelector(".quota-source-status");if(document.querySelectorAll(".quota-source-btn").forEach(a=>{let s=a.dataset.source;a.classList.toggle("active",s===C)}),t){let s=e!==!1&&(C!=="authorized"||Le);t.dataset.state=s?"ok":"error"}Me(),Rt(),updateModelManagerToolbar()}function Me(){let e=document.getElementById("quota-auth-card"),t=document.getElementById("quota-auth-row");if(!e||!t)return;if(C!=="authorized"){let r=q?.localAccountEmail;r?(e.classList.remove("hidden"),t.innerHTML=`
                    <div class="quota-auth-info">
                        <span class="quota-auth-icon">\u{1F464}</span>
                        <span class="quota-auth-text">${n["quotaSource.localAccountLabel"]||"\u5F53\u524D\u8D26\u6237"}</span>
                        <span class="quota-auth-email">${r}</span>
                    </div>
                `):e.classList.add("hidden");return}e.classList.remove("hidden");let o=K,a=o?.accounts||[],s=a.length>0,l=o?.activeAccount||(a.length>0?a[0].email:null);if(R){R.updateState(o,G,V),R.renderAuthRow(t,{showSyncToggleInline:!1});return}let c=`<button id="at-sync-config-btn" class="at-btn at-btn-primary" title="${n["atSyncConfig.title"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}">\u2699 ${n["atSyncConfig.btnText"]||"\u8D26\u53F7\u540C\u6B65\u914D\u7F6E"}</button>`;if(s&&l){let r=a.length>1,d=Math.max(a.length-1,0),f=d>0?`<span class="account-count-badge" title="${n["autoTrigger.manageAccounts"]||"Manage Accounts"}">+${d}</span>`:"",p=`<button id="quota-account-manage-btn" class="quota-account-manage-btn" title="${n["autoTrigger.manageAccounts"]}">${n["autoTrigger.manageAccounts"]}</button>`;t.innerHTML=`
                <div class="quota-auth-info quota-auth-info-clickable" title="${n["autoTrigger.manageAccounts"]}">
                    <span class="quota-auth-icon">\u2705</span>
                    <span class="quota-auth-text">${n["autoTrigger.authorized"]}</span>
                    <span class="quota-auth-email">${l}</span>
                    ${f}
                    ${p}
                </div>
                <div class="quota-auth-actions">
                    ${c}
                </div>
            `,t.querySelector(".quota-auth-info")?.addEventListener("click",()=>{Se()}),document.getElementById("quota-account-manage-btn")?.addEventListener("click",m=>{m.stopPropagation(),Se()}),document.getElementById("at-sync-config-btn")?.addEventListener("click",()=>{He()})}else t.innerHTML=`
                <div class="quota-auth-info">
                    <span class="quota-auth-icon">\u26A0\uFE0F</span>
                    <span class="quota-auth-text">${n["autoTrigger.unauthorized"]||"Unauthorized"}</span>
                </div>
                <div class="quota-auth-actions">
                    ${c}
                    <button id="quota-auth-btn" class="at-btn at-btn-primary">${n["autoTrigger.authorizeBtn"]||"Authorize"}</button>
                </div>
            `,document.getElementById("quota-auth-btn")?.addEventListener("click",()=>{at()}),document.getElementById("at-sync-config-btn")?.addEventListener("click",()=>{He()})}function Se(){let e=document.getElementById("account-manage-modal");e||(e=document.createElement("div"),e.id="account-manage-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content account-manage-content">
                    <div class="modal-header">
                        <h3>${n["autoTrigger.manageAccounts"]||"Manage Accounts"}</h3>
                        <button class="close-btn" id="close-account-manage-modal">\xD7</button>
                    </div>
                    <div class="modal-body" id="account-manage-body">
                        <!-- \u8D26\u53F7\u5217\u8868\u5C06\u5728\u8FD9\u91CC\u52A8\u6001\u6E32\u67D3 -->
                    </div>
                    <div class="modal-footer">
                        <button id="add-new-account-btn" class="at-btn at-btn-primary">\u2795 ${n["autoTrigger.addAccount"]||"Add Account"}</button>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-account-manage-modal")?.addEventListener("click",fe),e.addEventListener("click",t=>{t.target===e&&fe()}),document.getElementById("add-new-account-btn")?.addEventListener("click",()=>{u.postMessage({command:"autoTrigger.addAccount"})})),Oe(),e.classList.remove("hidden")}function fe(){let e=document.getElementById("account-manage-modal");e&&e.classList.add("hidden")}function Oe(){let e=document.getElementById("account-manage-body");if(!e)return;let t=K,o=t?.accounts||[],a=t?.activeAccount;if(o.length===0){e.innerHTML=`<div class="account-manage-empty">${n["autoTrigger.noAccounts"]||"No accounts authorized"}</div>`;return}let s=o.map(i=>{let l=i.email===a,c=i.isInvalid===!0,r=c?" expired":"",d=c?"\u26A0\uFE0F":l?"\u2705":"\u{1F464}",f=c?`<span class="account-manage-badge expired">${n["autoTrigger.tokenExpired"]||"Expired"}</span>`:"",p=l&&!c?`<span class="account-manage-badge">${n["autoTrigger.accountActive"]||"Active"}</span>`:"";return`
                <div class="account-manage-item ${l?"active":""}${r}" data-email="${i.email}">
                    <div class="account-manage-info">
                        <span class="account-manage-icon">${d}</span>
                        <span class="account-manage-email">${i.email}</span>
                        ${p}${f}
                    </div>
                    <div class="account-manage-actions">
                        <button class="at-btn at-btn-small at-btn-secondary account-reauth-btn" data-email="${i.email}">${n["autoTrigger.reauthorizeBtn"]||"Reauthorize"}</button>
                        <button class="at-btn at-btn-small at-btn-danger account-remove-btn" data-email="${i.email}">${n["autoTrigger.revokeBtn"]||"Revoke"}</button>
                    </div>
                </div>
            `}).join("");e.innerHTML=`<div class="account-manage-list">${s}</div>`,e.querySelectorAll(".account-manage-item").forEach(i=>{i.addEventListener("click",l=>{if(l.target.tagName==="BUTTON"||l.target.closest("button")||i.classList.contains("active"))return;let c=i.dataset.email;c&&(u.postMessage({command:"autoTrigger.switchAccount",email:c}),fe())})}),e.querySelectorAll(".account-reauth-btn").forEach(i=>{i.addEventListener("click",l=>{l.stopPropagation();let c=i.dataset.email;u.postMessage({command:"autoTrigger.reauthorizeAccount",email:c})})}),e.querySelectorAll(".account-remove-btn").forEach(i=>{i.addEventListener("click",l=>{l.stopPropagation();let c=i.dataset.email;c&&typeof window.openRevokeModalForEmail=="function"&&window.openRevokeModalForEmail(c)})})}function Rt(){if(!j)return;if(O||!q||!q.isConnected){j.classList.add("hidden");return}let e=C==="authorized",o=e?n["quotaSource.authorizedInfoTitle"]||"Authorized Monitoring":n["quotaSource.localInfoTitle"]||"Local Monitoring";j.classList.remove("hidden"),j.classList.toggle("authorized",e),j.classList.toggle("local",!e),j.innerHTML=`
            <div class="quota-source-info-content">
                <div class="quota-source-info-text">${o}</div>
            </div>
        `}function Ue(e){ye.style.display="none",w.innerHTML="",e==="authorized"?Gt():Pt()}function Pt(){let e=document.createElement("div");e.className="offline-card local-card",e.innerHTML=`
            <div class="icon offline-spinner"><span class="spinner"></span></div>
            <h2>${n["quotaSource.localLoadingTitle"]||"Detecting local Antigravity..."}</h2>
            <p>${n["quotaSource.localLoadingDesc"]||"Keep the Antigravity client running. You can switch to authorized monitoring anytime."}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-authorized">
                    ${n["quotaSource.switchToAuthorized"]||"Switch to Authorized"}
                </button>
            </div>
        `,w.appendChild(e),e.querySelector('[data-action="switch-authorized"]')?.addEventListener("click",()=>{oe("authorized",{force:!0})})}function Gt(){let e=document.createElement("div");e.className="offline-card authorized-card",e.innerHTML=`
            <div class="icon offline-spinner"><span class="spinner"></span></div>
            <h2>${n["quotaSource.authorizedLoadingTitle"]||"Loading authorized quota..."}</h2>
            <p>${n["quotaSource.authorizedLoadingDesc"]||"Fetching quota data from the remote API."}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-local">
                    ${n["quotaSource.switchToLocal"]||"Switch to Local"}
                </button>
            </div>
        `,w.appendChild(e),e.querySelector('[data-action="switch-local"]')?.addEventListener("click",()=>{oe("local",{force:!0})})}function W(e){let t=e?.label||"",o=e?.modelId||"";if(Ne.has(o))return Ne.get(o);if(xe.has(t))return xe.get(t);let a=ue(o),s=ue(t);return Math.min(gt.get(a)??Number.MAX_SAFE_INTEGER,pt.get(s)??Number.MAX_SAFE_INTEGER)}function Fe(e){return e.filter(t=>W(t)<Number.MAX_SAFE_INTEGER).sort((t,o)=>W(t)-W(o)).map(t=>t.modelId)}function Ht(){be&&(z=zt(),x=new Set(_t(z)),Ot(),be.classList.remove("hidden"))}function $e(){be?.classList.add("hidden")}function zt(){return(q?.allModels||q?.models||[]).filter(o=>W(o)<Number.MAX_SAFE_INTEGER).sort((o,a)=>{let s=W(o),i=W(a);return s!==i?s-i:(o.label||"").localeCompare(a.label||"")})}function _t(e){let t=e.map(a=>a.modelId);if(Array.isArray(ne)&&ne.length>0)return ne.filter(a=>t.includes(a));let o=Fe(e).filter(a=>t.includes(a));return o.length>0?o:t}function Ot(){if(Y){if(z.length===0){Y.innerHTML=`<div class="model-manager-empty">${n["models.empty"]||"No models available."}</div>`,he();return}Y.innerHTML=z.map(e=>{let t=T.modelCustomNames?.[e.modelId]||e.label||e.modelId,o=x.has(e.modelId)?"checked":"";return`
                <label class="model-manager-item">
                    <input type="checkbox" data-model-id="${e.modelId}" ${o}>
                    <span>${t}</span>
                </label>
            `}).join(""),Y.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",()=>{let t=e.getAttribute("data-model-id");t&&(e.checked?x.add(t):x.delete(t),he())})}),he()}}function je(e){e==="all"?x=new Set(z.map(t=>t.modelId)):e==="recommended"?x=new Set(Fe(z)):x=new Set,Y?.querySelectorAll('input[type="checkbox"]').forEach(t=>{let o=t.getAttribute("data-model-id");t.checked=o?x.has(o):!1}),he()}function he(){if(!Ce)return;let e=z.length,t=x.size;Ce.textContent=e>0?`${t}/${e}`:""}function Ut(){let e=z.map(a=>a.modelId),t=Array.from(x),o=t.length===0||t.length===e.length?[]:t;ne=o,T.visibleModels=o,u.postMessage({command:"updateVisibleModels",visibleModels:o}),S(n["models.saved"]||"Model visibility updated.","success"),$e()}function Qe(e){let t=document.querySelectorAll(".tab-btn"),o=document.querySelectorAll(".tab-content"),a=document.querySelector(`.tab-btn[data-tab="${e}"]`);a&&(t.forEach(s=>s.classList.remove("active")),a.classList.add("active"),o.forEach(s=>{s.id===`tab-${e}`?s.classList.add("active"):s.classList.remove("active")}))}function Ke(){Ee&&(D.innerHTML=`<span class="spinner"></span>${n["dashboard.refreshing"]||"Refreshing..."}`)}function Ve(e){D.disabled=!0,D.innerHTML=e+"s";let t=e,o=setInterval(()=>{t--,t<=0?(clearInterval(o),D.disabled=!1,D.innerHTML=n["dashboard.refresh"]||"REFRESH"):D.innerHTML=t+"s"},1e3)}function S(e,t="info"){ce&&(ce.textContent=e,ce.className=`toast ${t}`,setTimeout(()=>{ce.classList.add("hidden")},3e3))}function We(e){let t=T.warningThreshold||30,o=T.criticalThreshold||10;return e>t?"var(--success)":e>o?"var(--warning)":"var(--danger)"}function Xe(e){let t=T.warningThreshold||30,o=T.criticalThreshold||10;return e>t?n["dashboard.active"]||"Healthy":e>o?n["dashboard.warning"]||"Warning":n["dashboard.danger"]||"Danger"}function Ft(e){u.postMessage({command:"togglePin",modelId:e})}function Je(){u.postMessage({command:"retry"})}function jt(){u.postMessage({command:"openLogs"})}window.retryConnection=Je,window.openLogs=jt,window.showLocalAuthImportLoading=Ie,window.openAccountManageModal=()=>{R?R.openAccountManageModal():Se()};function Ye(e){this.style.opacity="0.4",N=this,e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",this.getAttribute("data-id")),this.classList.add("dragging")}function Ze(e){return e.preventDefault&&e.preventDefault(),e.dataTransfer.dropEffect="move",!1}function et(){this.classList.add("over")}function tt(){this.classList.remove("over")}function nt(e){if(e.stopPropagation&&e.stopPropagation(),N!==this){let t=N.classList.contains("card")?".card":"tr",o=N.parentElement,a=Array.from(o.querySelectorAll(t)),s=a.indexOf(N),i=a.indexOf(this);s<i?this.after(N):this.before(N);let l=Array.from(o.querySelectorAll(t));if(N.classList.contains("group-card")||N.classList.contains("list-group-row")){let r=l.map(d=>d.getAttribute("data-group-id")).filter(d=>d!==null);u.postMessage({command:"updateGroupOrder",order:r})}else{let r=l.map(d=>d.getAttribute("data-id")).filter(d=>d!==null);u.postMessage({command:"updateOrder",order:r})}}return!1}function ot(){this.style.opacity="1",this.classList.remove("dragging"),document.querySelectorAll(".card, tr").forEach(e=>{e.classList.remove("over")})}function Qt(e,t){if(ye.style.display="none",w.innerHTML="",!e.isConnected){(t?.quotaSource||C)==="authorized"?Vt(e.errorMessage):Kt(e.errorMessage);return}if(e.userInfo&&!re&&sn(e.userInfo),Ct(t?.groupingEnabled),t?.groupingEnabled&&e.groups&&e.groups.length>0){Wt();let a=[...e.groups];if(t?.groupOrder?.length>0){let s=new Map;t.groupOrder.forEach((i,l)=>s.set(i,l)),a.sort((i,l)=>{let c=s.has(i.groupId)?s.get(i.groupId):99999,r=s.has(l.groupId)?s.get(l.groupId):99999;return c!==r?c-r:i.remainingPercentage-l.remainingPercentage})}a.forEach(s=>{dn(s,t?.pinnedGroups||[])});return}let o=[...e.models];if(t?.modelOrder?.length>0){let a=new Map;t.modelOrder.forEach((s,i)=>a.set(s,i)),o.sort((s,i)=>{let l=a.has(s.modelId)?a.get(s.modelId):99999,c=a.has(i.modelId)?a.get(i.modelId):99999;return l-c})}o.forEach(a=>{rn(a,t?.pinnedModels||[],t?.modelCustomNames||{})})}function Kt(e){let t=e||n["dashboard.offlineDesc"]||"Could not detect Antigravity process. Please ensure Antigravity is running.",o=document.createElement("div");o.className="offline-card local-card",o.innerHTML=`
            <div class="icon">\u{1F6F0}\uFE0F</div>
            <h2>${n["quotaSource.localOfflineTitle"]||"Local monitoring unavailable"}</h2>
            <p>${t}</p>
            <div class="offline-actions">
                <button class="btn-secondary" data-action="retry-local">
                    ${n["quotaSource.retryLocal"]||n["help.retry"]||"Retry"}
                </button>
                <button class="btn-primary" data-action="switch-authorized">
                    ${n["quotaSource.switchToAuthorized"]||"Switch to Authorized"}
                </button>
            </div>
        `,w.appendChild(o);let a=o.querySelector('[data-action="retry-local"]'),s=o.querySelector('[data-action="switch-authorized"]');a?.addEventListener("click",Je),s?.addEventListener("click",()=>{oe("authorized",{force:!0})})}function Vt(e){let t=!!K?.isAuthorized,o=t?n["quotaSource.authorizedOfflineTitle"]||"Authorized monitoring unavailable":n["quotaSource.authorizedMissingTitle"]||"Authorization required",a=t?n["quotaSource.authorizedOfflineDesc"]||"Failed to fetch quota from the remote API. Please check your network and try again.":n["quotaSource.authorizedMissingDesc"]||"Complete authorization to use authorized monitoring.",s=e?`<p class="offline-detail">${e}</p>`:"",i=document.createElement("div");i.className="offline-card authorized-card",i.innerHTML=`
            <div class="icon">\u{1F510}</div>
            <h2>${o}</h2>
            <p>${a}</p>
            ${s}
            <div class="offline-actions">
                <button class="btn-secondary" data-action="switch-local">
                    ${n["quotaSource.switchToLocal"]||"Switch to Local"}
                </button>
                <button class="btn-primary" data-action="authorized-primary">
                    ${t?n["dashboard.refresh"]||"Refresh":n["autoTrigger.authorizeBtn"]||"Authorize"}
                </button>
            </div>
        `,w.appendChild(i);let l=i.querySelector('[data-action="switch-local"]'),c=i.querySelector('[data-action="authorized-primary"]');l?.addEventListener("click",()=>{oe("local",{force:!0})}),t?c?.addEventListener("click",Ge):c?.addEventListener("click",()=>{at()})}function at(){let e=document.getElementById("auth-choice-modal");e||(e=document.createElement("div"),e.id="auth-choice-modal",e.className="modal hidden",e.innerHTML=`
                <div class="modal-content auth-choice-content">
                    <div class="modal-header">
                        <h3>${n["authChoice.title"]||"\u9009\u62E9\u767B\u5F55\u65B9\u5F0F"}</h3>
                        <button class="close-btn" id="close-auth-choice-modal">\xD7</button>
                    </div>
                    <div class="modal-body auth-choice-body">
                        <div class="auth-choice-info">
                            <div class="auth-choice-desc">${n["authChoice.desc"]||"\u8BF7\u9009\u62E9\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7\u6216\u6388\u6743\u767B\u5F55\u3002"}</div>
                            <div class="auth-choice-tip">${n["authChoice.tip"]||"\u6388\u6743\u767B\u5F55\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\uFF1B\u672C\u5730\u8BFB\u53D6\u4EC5\u5BF9\u5F53\u524D\u673A\u5668\u751F\u6548\u3002"}</div>
                        </div>
                        <div class="auth-choice-grid">
                            <div class="auth-choice-card">
                                <div class="auth-choice-header">
                                    <span class="auth-choice-icon">\u{1F5A5}\uFE0F</span>
                                    <div>
                                        <div class="auth-choice-title">${n["authChoice.localTitle"]||"\u8BFB\u53D6\u672C\u5730\u5DF2\u6388\u6743\u8D26\u53F7"}</div>
                                        <div class="auth-choice-text">${n["authChoice.localDesc"]||"\u8BFB\u53D6\u672C\u673A Antigravity \u5BA2\u6237\u7AEF\u5DF2\u6388\u6743\u8D26\u53F7\uFF0C\u4E0D\u91CD\u65B0\u6388\u6743\uFF0C\u4EC5\u590D\u7528\u73B0\u6709\u6388\u6743\u3002"}</div>
                                    </div>
                                </div>
                                <button id="auth-choice-local-btn" class="at-btn at-btn-primary auth-choice-btn">
                                    ${n["authChoice.localBtn"]||"\u8BFB\u53D6\u672C\u5730\u6388\u6743"}
                                </button>
                            </div>
                            <div class="auth-choice-card">
                                <div class="auth-choice-header">
                                    <span class="auth-choice-icon">\u{1F510}</span>
                                    <div>
                                        <div class="auth-choice-title">${n["authChoice.oauthTitle"]||"\u6388\u6743\u767B\u5F55\uFF08\u4E91\u7AEF\u6388\u6743\uFF09"}</div>
                                        <div class="auth-choice-text">${n["authChoice.oauthDesc"]||"\u901A\u8FC7 Google OAuth \u65B0\u6388\u6743\uFF0C\u9002\u7528\u4E8E\u65E0\u5BA2\u6237\u7AEF\u573A\u666F\uFF0C\u53EF\u64A4\u9500\u3002"}</div>
                                    </div>
                                </div>
                                <button id="auth-choice-oauth-btn" class="at-btn at-btn-primary auth-choice-btn">
                                    ${n["authChoice.oauthBtn"]||"\u53BB\u6388\u6743\u767B\u5F55"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,document.body.appendChild(e),document.getElementById("close-auth-choice-modal")?.addEventListener("click",ve),e.addEventListener("click",i=>{i.target===e&&ve()}));let t=e.querySelector("#auth-choice-oauth-btn"),o=e.querySelector("#auth-choice-local-btn"),a=t.cloneNode(!0);t.parentNode.replaceChild(a,t);let s=o.cloneNode(!0);o.parentNode.replaceChild(s,o),e.querySelector("#auth-choice-oauth-btn")?.addEventListener("click",()=>{u.postMessage({command:"autoTrigger.authorize"}),ve()}),e.querySelector("#auth-choice-local-btn")?.addEventListener("click",()=>{Ie(),u.postMessage({command:"autoTrigger.importLocal"}),ve()}),e.classList.remove("hidden")}function ve(){let e=document.getElementById("auth-choice-modal");e&&e.classList.add("hidden")}function Wt(){let e=document.createElement("div");e.className="auto-group-toolbar",e.innerHTML=`
            <span class="grouping-hint">
                ${n["grouping.description"]||'This mode aggregates models sharing the same quota. Supports renaming, sorting, and status bar sync. Click "Manage Groups" to customize, or toggle "Quota Groups" above to switch back.'}
            </span>
            <button id="manage-group-btn" class="auto-group-link" title="${n["customGrouping.title"]||"Manage Groups"}">
                <span class="icon">\u2699\uFE0F</span>
                ${n["customGrouping.title"]||"Manage Groups"}
            </button>
        `,w.appendChild(e);let t=e.querySelector("#manage-group-btn");t&&t.addEventListener("click",Xt)}function Xt(){if(!me||!q)return;let e=q.models||[];y.allModels=e,y.groupMappings={...T.groupMappings||{}};let t=new Map,o=T.groupCustomNames||{};for(let a of e){let s=y.groupMappings[a.modelId];if(s){if(!t.has(s)){let i="";for(let l of Object.keys(o))if(y.groupMappings[l]===s){i=o[l];break}t.set(s,{id:s,name:i||`Group ${t.size+1}`,modelIds:[]})}t.get(s).modelIds.push(a.modelId)}}y.groups=Array.from(t.values()),X(),me.classList.remove("hidden")}function Ae(){me&&me.classList.add("hidden")}function X(){let e=document.getElementById("custom-groups-list"),t=document.getElementById("ungrouped-models-list");if(!e||!t)return;let o=new Set;y.groups.forEach(s=>s.modelIds.forEach(i=>o.add(i))),y.groups.length===0?e.innerHTML=`<div class="empty-groups-hint">${n["customGrouping.noModels"]||'No groups yet. Click "Add Group" to create one.'}</div>`:(e.innerHTML=y.groups.map((s,i)=>{let l=s.modelIds.map(c=>{let r=y.allModels.find(f=>f.modelId===c),d=r?T.modelCustomNames?.[c]||r.label:c;return`
                        <span class="custom-model-tag" data-model-id="${c}">
                            ${d}
                            <button class="remove-model-btn" data-group-index="${i}" data-model-id="${c}" title="${n["customGrouping.removeModel"]||"Remove"}">\xD7</button>
                        </span>
                    `}).join("");return`
                    <div class="custom-group-item" data-group-index="${i}">
                        <div class="custom-group-header">
                            <div class="custom-group-name">
                                <span>\u{1F4E6}</span>
                                <input type="text" value="${s.name}" data-group-index="${i}" placeholder="Group name...">
                            </div>
                            <div class="custom-group-actions">
                                <button class="delete-group-btn" data-group-index="${i}" title="${n["customGrouping.deleteGroup"]||"Delete Group"}">\u{1F5D1}\uFE0F</button>
                            </div>
                        </div>
                        <div class="custom-group-models">
                            ${l}
                            <button class="add-model-btn" data-group-index="${i}">
                                \u2795 ${n["customGrouping.addModel"]||"Add Model"}
                            </button>
                        </div>
                    </div>
                `}).join(""),e.querySelectorAll(".remove-model-btn").forEach(s=>{s.addEventListener("click",Zt)}),e.querySelectorAll(".delete-group-btn").forEach(s=>{s.addEventListener("click",Yt)}),e.querySelectorAll(".add-model-btn").forEach(s=>{s.addEventListener("click",tn)}),e.querySelectorAll(".custom-group-name input").forEach(s=>{s.addEventListener("change",en)}));let a=y.allModels.filter(s=>!o.has(s.modelId));a.length===0?t.innerHTML=`<div style="color: var(--text-secondary); font-size: 12px;">${n["customGrouping.noModels"]||"All models are grouped"}</div>`:t.innerHTML=a.map(s=>{let i=T.modelCustomNames?.[s.modelId]||s.label,l=(s.remainingPercentage||0).toFixed(0);return`
                    <div class="ungrouped-model-item" data-model-id="${s.modelId}" title="${s.modelId}">
                        ${i}
                        <span class="quota-badge">${l}%</span>
                    </div>
                `}).join("")}function Jt(){let e="custom_group_"+Date.now();y.groups.push({id:e,name:`Group ${y.groups.length+1}`,modelIds:[]}),X()}function Yt(e){let t=parseInt(e.target.dataset.groupIndex,10);!isNaN(t)&&t>=0&&t<y.groups.length&&(y.groups.splice(t,1),X())}function Zt(e){e.stopPropagation();let t=parseInt(e.target.dataset.groupIndex,10),o=e.target.dataset.modelId;if(!isNaN(t)&&o){let a=y.groups[t];a&&(a.modelIds=a.modelIds.filter(s=>s!==o),X())}}function en(e){let t=parseInt(e.target.dataset.groupIndex,10);!isNaN(t)&&y.groups[t]&&(y.groups[t].name=e.target.value.trim()||`Group ${t+1}`)}function tn(e){let t=parseInt(e.target.dataset.groupIndex,10);if(isNaN(t))return;let o=y.groups[t];if(!o)return;let a=new Set;y.groups.forEach(l=>l.modelIds.forEach(c=>a.add(c)));let s=y.allModels.filter(l=>!a.has(l.modelId));if(s.length===0){S(n["customGrouping.noModels"]||"No available models","info");return}let i=null;if(o.modelIds.length>0){let l=o.modelIds[0],c=y.allModels.find(r=>r.modelId===l);c&&(i={remainingPercentage:c.remainingPercentage,resetTimeDisplay:c.resetTimeDisplay})}nn(e.target,s,i,l=>{o.modelIds.push(l),X()})}function nn(e,t,o,a){let s=document.querySelector(".model-select-dropdown");s&&s.remove();let i=document.createElement("div");i.className="model-select-dropdown";let l=e.getBoundingClientRect();i.style.position="fixed",i.style.left=l.left+"px",i.style.top=l.bottom+4+"px";let c=t.map(g=>{let v=!0,E="";return o&&(g.remainingPercentage!==o.remainingPercentage?(v=!1,E=n["customGrouping.quotaMismatch"]||"Quota mismatch"):g.resetTimeDisplay!==o.resetTimeDisplay&&(v=!1,E=n["customGrouping.resetMismatch"]||"Reset time mismatch")),{model:g,isCompatible:v,incompatibleReason:E}});c.sort((g,v)=>g.isCompatible&&!v.isCompatible?-1:!g.isCompatible&&v.isCompatible?1:0);let r=c.some(g=>g.isCompatible);i.innerHTML=`
            <div class="model-select-list">
                ${c.map(({model:g,isCompatible:v,incompatibleReason:E})=>{let L=T.modelCustomNames?.[g.modelId]||g.label,$=(g.remainingPercentage||0).toFixed(1);return`
                        <label class="model-select-item ${v?"":"disabled"}" 
                             data-model-id="${g.modelId}" 
                             data-compatible="${v}">
                            <input type="checkbox" class="model-checkbox" 
                                   value="${g.modelId}" 
                                   ${v?"":"disabled"}>
                            <span class="model-name">${L}</span>
                            <span class="model-quota">${$}%</span>
                            ${v?"":`<span class="incompatible-reason">${E}</span>`}
                        </label>
                    `}).join("")}
            </div>
            ${r?`
                <div class="model-select-footer">
                    <button class="btn-confirm-add" disabled>
                        ${n["customGrouping.addModel"]||"Add"} (<span class="selected-count">0</span>)
                    </button>
                </div>
            `:""}
        `,document.body.appendChild(i);let d=i.querySelector(".btn-confirm-add"),f=i.querySelector(".selected-count"),p=i.querySelectorAll(".model-checkbox"),m=()=>{let g=i.querySelectorAll(".model-checkbox:checked"),v=g.length;f&&(f.textContent=v),d&&(d.disabled=v===0);let E=o;if(!E&&v>0){let L=g[0].value,$=c.find(k=>k.model.modelId===L);$&&(E={remainingPercentage:$.model.remainingPercentage,resetTimeDisplay:$.model.resetTimeDisplay})}p.forEach(L=>{if(L.checked)return;let $=L.value,k=c.find(vn=>vn.model.modelId===$);if(!k)return;let B=L.closest(".model-select-item");if(!B)return;let A=!0,I="";E&&(k.model.remainingPercentage!==E.remainingPercentage?(A=!1,I=n["customGrouping.quotaMismatch"]||"Quota mismatch"):k.model.resetTimeDisplay!==E.resetTimeDisplay&&(A=!1,I=n["customGrouping.resetMismatch"]||"Reset time mismatch")),L.disabled=!A,B.classList.toggle("disabled",!A);let M=B.querySelector(".incompatible-reason");A?M&&M.remove():(M||(M=document.createElement("span"),M.className="incompatible-reason",B.appendChild(M)),M.textContent=I)})};p.forEach(g=>{g.disabled||g.addEventListener("change",m)}),d&&d.addEventListener("click",g=>{g.stopPropagation();let v=Array.from(i.querySelectorAll(".model-checkbox:checked")).map(E=>E.value);v.length>0&&(v.forEach(E=>a(E)),i.remove())});let h=g=>{!i.contains(g.target)&&g.target!==e&&(i.remove(),document.removeEventListener("click",h))};setTimeout(()=>{document.addEventListener("click",h)},10)}function on(){let e=y.allModels;if(!e||e.length===0){S(n["customGrouping.noModels"]||"No models available","info");return}let t={};for(let s of y.groups)for(let i of s.modelIds)t[i]=s.name;let o=new Map;for(let s of e){let i=`${(s.remainingPercentage||0).toFixed(6)}_${s.resetTimeDisplay||""}`;o.has(i)||o.set(i,[]),o.get(i).push(s.modelId)}y.groups=[];let a=1;for(let[s,i]of o){let l=[...i].sort().join("_"),c={};for(let p of i){let m=t[p];m&&(c[m]=(c[m]||0)+1)}let r="",d=0;for(let[p,m]of Object.entries(c))m>d&&(d=m,r=p);let f=r;if(!f){let p=T.groupCustomNames||{};for(let m of i)if(p[m]){f=p[m];break}}if(!f){let p=e.find(m=>m.modelId===i[0]);f=i.length===1?T.modelCustomNames?.[i[0]]||p?.label||`Group ${a}`:`Group ${a}`}y.groups.push({id:l,name:f,modelIds:i}),a++}X(),S(n["customGrouping.smartGroup"]+": "+y.groups.length+" groups","success")}function an(){y.groups.filter(a=>a.modelIds.length===0).length>0&&(y.groups=y.groups.filter(a=>a.modelIds.length>0));let t={},o={};for(let a of y.groups){let s=a.modelIds.sort().join("_");for(let i of a.modelIds)t[i]=s,o[i]=a.name}u.postMessage({command:"saveCustomGrouping",customGroupMappings:t,customGroupNames:o}),S(n["customGrouping.saved"]||"Groups saved","success"),Ae()}let se=!1;function sn(e){if(re)return;let t=document.createElement("div");t.className="card full-width profile-card";let o=p=>H?'<span class="tag masked">***</span>':p?`<span class="tag success">${n["feature.enabled"]||"Enabled"}</span>`:`<span class="tag disabled">${n["feature.disabled"]||"Disabled"}</span>`,a=p=>H?"***":p,s="";e.upgradeText&&e.upgradeUri&&!H&&(s=`
            <div class="upgrade-info">
                <div class="upgrade-text">${e.upgradeText}</div>
                <a href="${e.upgradeUri}" class="upgrade-link" target="_blank">Upgrade Now</a>
            </div>`);let i=se?"profile-details":"profile-details hidden",l=se?n["profile.less"]||"Show Less":n["profile.more"]||"Show More Details",c=se?"rotate(180deg)":"rotate(0deg)",r=H?n["profile.showData"]||"Show":n["profile.hideData"]||"Hide";t.innerHTML=`
            <div class="card-title">
                <span class="label">${n["profile.details"]||"Plan Details"}</span>
                <div class="profile-controls">
                    <button class="text-btn" id="profile-mask-btn">${r}</button>
                    <div class="tier-badge">${e.tier}</div>
                </div>
            </div>
            
            <div class="profile-grid">
                ${b(n["profile.email"]||"Email",a(e.email))}
                ${b(n["profile.description"]||"Description",a(e.tierDescription))}
                ${b(n["feature.webSearch"]||"Web Search",o(e.cascadeWebSearchEnabled))}
                ${b(n["feature.browser"]||"Browser Access",o(e.browserEnabled))}
                ${b(n["feature.knowledgeBase"]||"Knowledge Base",o(e.knowledgeBaseEnabled))}
                ${b(n["feature.mcp"]||"MCP Servers",o(e.allowMcpServers))}
                ${b(n["feature.gitCommit"]||"Git Commit",o(e.canGenerateCommitMessages))}
                ${b(n["feature.context"]||"Context Window",a(e.maxNumChatInputTokens))}
            </div>

            <div class="${i}" id="profile-more">
                <div class="profile-grid">
                    ${b(n["feature.fastMode"]||"Fast Mode",o(e.hasAutocompleteFastMode))}
                    ${b(n["feature.moreCredits"]||"Can Buy Credits",o(e.canBuyMoreCredits))}
                    
                    ${b(n["profile.teamsTier"]||"Teams Tier",a(e.teamsTier))}
                    ${b(n["profile.userId"]||"Tier ID",a(e.userTierId||"N/A"))}
                    ${b(n["profile.tabToJump"]||"Tab To Jump",o(e.hasTabToJump))}
                    ${b(n["profile.stickyModels"]||"Sticky Models",o(e.allowStickyPremiumModels))}
                    ${b(n["profile.commandModels"]||"Command Models",o(e.allowPremiumCommandModels))}
                    ${b(n["profile.maxPremiumMsgs"]||"Max Premium Msgs",a(e.maxNumPremiumChatMessages))}
                    ${b(n["profile.chatInstructionsCharLimit"]||"Chat Instructions Char Limit",a(e.maxCustomChatInstructionCharacters))}
                    ${b(n["profile.pinnedContextItems"]||"Pinned Context Items",a(e.maxNumPinnedContextItems))}
                    ${b(n["profile.localIndexSize"]||"Local Index Size",a(e.maxLocalIndexSize))}
                    ${b(n["profile.acceptedTos"]||"Accepted TOS",o(e.acceptedLatestTermsOfService))}
                    ${b(n["profile.customizeIcon"]||"Customize Icon",o(e.canCustomizeAppIcon))}
                    ${b(n["profile.cascadeAutoRun"]||"Cascade Auto Run",o(e.cascadeCanAutoRunCommands))}
                    ${b(n["profile.cascadeBackground"]||"Cascade Background",o(e.canAllowCascadeInBackground))}
                    ${b(n["profile.autoRunCommands"]||"Auto Run Commands",o(e.allowAutoRunCommands))}
                    ${b(n["profile.expBrowserFeatures"]||"Exp. Browser Features",o(e.allowBrowserExperimentalFeatures))}
                </div>
                ${s}
            </div>

            <div class="profile-toggle">
                <button class="btn-text" id="profile-toggle-btn">
                    <span id="profile-toggle-text">${l}</span> 
                    <span id="profile-toggle-icon" style="transform: ${c}">\u25BC</span>
                </button>
            </div>
        `,w.appendChild(t);let d=t.querySelector("#profile-toggle-btn");d&&d.addEventListener("click",cn);let f=t.querySelector("#profile-mask-btn");f&&f.addEventListener("click",()=>{H=!H,u.postMessage({command:"updateDataMasked",dataMasked:H})})}function cn(){let e=document.getElementById("profile-more"),t=document.getElementById("profile-toggle-text"),o=document.getElementById("profile-toggle-icon");e.classList.contains("hidden")?(e.classList.remove("hidden"),t.textContent=n["profile.less"]||"Show Less",o.style.transform="rotate(180deg)",se=!0):(e.classList.add("hidden"),t.textContent=n["profile.more"]||"Show More Details",o.style.transform="rotate(0deg)",se=!1)}function b(e,t){return`
            <div class="detail-item">
                <span class="detail-label">${e}</span>
                <span class="detail-value">${t}</span>
            </div>
        `}function ln(){let e=document.createElement("div");e.className="rich-tooltip hidden",document.body.appendChild(e);let t=null;document.addEventListener("mouseover",o=>{let a=o.target.closest("[data-tooltip-html]");if(a&&a!==t){t=a;let s=a.getAttribute("data-tooltip-html"),i=decodeURIComponent(s);e.innerHTML=i,e.classList.remove("hidden");let l=a.getBoundingClientRect(),c=e.getBoundingClientRect(),r=l.bottom+8,d=l.left+(l.width-c.width)/2;r+c.height>window.innerHeight&&(r=l.top-c.height-8),d<10&&(d=10),d+c.width>window.innerWidth-10&&(d=window.innerWidth-c.width-10),e.style.top=r+"px",e.style.left=d+"px"}}),document.addEventListener("mouseout",o=>{let a=o.target.closest("[data-tooltip-html]");a&&a===t&&(t=null,e.classList.add("hidden"))}),window.addEventListener("scroll",()=>{t&&(t=null,e.classList.add("hidden"))},!0)}function ie(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function st(e){let t=[],o=e.supportedMimeTypes||{};return(e.supportsImages||Object.keys(o).some(a=>a.startsWith("image/")))&&t.push({icon:"\u{1F5BC}\uFE0F",text:n["capability.vision"]||"Vision"}),(o["application/pdf"]||o["text/plain"]||o["application/rtf"])&&t.push({icon:"\u{1F4C4}",text:n["capability.docs"]||"Documents"}),Object.keys(o).some(a=>a.startsWith("video/")||a.startsWith("audio/"))&&t.push({icon:"\u{1F3AC}",text:n["capability.media"]||"Media"}),t}function it(e){return e.map(t=>`<div class="rich-tooltip-item ${t.className||""}"><span class="icon">${t.icon}</span><span class="text">${t.text}</span></div>`).join("")}function dn(e,t){let o=e.remainingPercentage||0,a=We(o),s=t&&t.includes(e.groupId),i=document.createElement("div");i.className="card group-card draggable",i.setAttribute("data-id",e.groupId),i.setAttribute("data-group-id",e.groupId),i.setAttribute("draggable","true"),i.addEventListener("dragstart",Ye,!1),i.addEventListener("dragenter",et,!1),i.addEventListener("dragover",Ze,!1),i.addEventListener("dragleave",tt,!1),i.addEventListener("drop",nt,!1),i.addEventListener("dragend",ot,!1);let l=e.models.map(d=>{let f=st(d),p=d.tagTitle?`<span class="tag-new">${d.tagTitle}</span>`:"",m=d.isRecommended?" recommended":"",h="",g="";return f.length>0&&(h=` data-tooltip-html="${encodeURIComponent(it(f))}"`,g='<span class="caps-dot">\u2728</span>'),`<span class="group-model-tag${m}" title="${d.modelId}"${h}>${d.label}${p}${g}</span>`}).join("");i.innerHTML=`
            <div class="card-title">
                <span class="drag-handle" data-tooltip="${n["dashboard.dragHint"]||"Drag to reorder"}">\u22EE\u22EE</span>
                <span class="group-icon">\u{1F4E6}</span>
                <span class="label group-name">${e.groupName}</span>
                <div class="actions">
                    <button class="rename-group-btn icon-btn" data-group-id="${e.groupId}" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["grouping.rename"]||"Rename")+"</span></div>")}">\u270F\uFE0F</button>
                    <label class="switch" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["dashboard.pinHint"]||"Pin to Status Bar")+"</span></div>")}">
                        <input type="checkbox" class="group-pin-toggle" data-group-id="${e.groupId}" ${s?"checked":""}>
                        <span class="slider"></span>
                    </label>
                    <span class="status-dot" style="background-color: ${a}"></span>
                </div>
            </div>
            <div class="progress-circle" style="background: conic-gradient(${a} ${o}%, var(--border-color) ${o}%);">
                <div class="percentage">${o.toFixed(2)}%</div>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetIn"]||"Reset In"}</span>
                <span class="info-value">${e.timeUntilResetFormatted}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetTime"]||"Reset Time"}</span>
                <span class="info-value small">${e.resetTimeDisplay||"N/A"}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.status"]||"Status"}</span>
                <span class="info-value" style="color: ${a}">
                    ${Xe(o)}
                </span>
            </div>
            <div class="group-models">
                <div class="group-models-label">${n["grouping.models"]||"Models"} (${e.models.length}):</div>
                <div class="group-models-list">${l}</div>
            </div>
        `;let c=i.querySelector(".rename-group-btn");c&&c.addEventListener("click",d=>{d.stopPropagation(),It(e.groupId,e.groupName,e.models.map(f=>f.modelId))});let r=i.querySelector(".group-pin-toggle");r&&r.addEventListener("change",d=>{u.postMessage({command:"toggleGroupPin",groupId:e.groupId})}),w.appendChild(i)}function rn(e,t,o){let a=e.remainingPercentage||0,s=We(a),i=t.includes(e.modelId),l=o&&o[e.modelId]||e.label,c=e.label,r=st(e),d="",f="";r.length>0&&(f=` data-tooltip-html="${encodeURIComponent(it(r))}"`,d='<span class="title-caps-trigger">\u2728</span>');let p=e.tagTitle?`<span class="tag-new">${e.tagTitle}</span>`:"",m=e.isRecommended?" card-recommended":"",h=document.createElement("div");h.className=`card draggable${m}`,h.setAttribute("draggable","true"),h.setAttribute("data-id",e.modelId),h.addEventListener("dragstart",Ye,!1),h.addEventListener("dragenter",et,!1),h.addEventListener("dragover",Ze,!1),h.addEventListener("dragleave",tt,!1),h.addEventListener("drop",nt,!1),h.addEventListener("dragend",ot,!1),h.innerHTML=`
            <div class="card-title">
                <span class="drag-handle" data-tooltip="${n["dashboard.dragHint"]||"Drag to reorder"}">\u22EE\u22EE</span>
                <div class="title-wrapper"${f}>
                    <span class="label model-name" title="${e.modelId} (${c})">${l}</span>
                    ${p}
                    ${d}
                </div>
                <div class="actions">
                    <button class="rename-model-btn icon-btn" data-model-id="${e.modelId}" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["model.rename"]||"Rename")+"</span></div>")}">\u270F\uFE0F</button>
                    <label class="switch" data-tooltip-html="${encodeURIComponent('<div class="rich-tooltip-item"><span class="text">'+(n["dashboard.pinHint"]||"Pin to Status Bar")+"</span></div>")}">
                        <input type="checkbox" class="pin-toggle" data-model-id="${e.modelId}" ${i?"checked":""}>
                        <span class="slider"></span>
                    </label>
                    <span class="status-dot" style="background-color: ${s}"></span>
                </div>
            </div>
            <div class="progress-circle" style="background: conic-gradient(${s} ${a}%, var(--border-color) ${a}%);">
                <div class="percentage">${a.toFixed(2)}%</div>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetIn"]||"Reset In"}</span>
                <span class="info-value">${e.timeUntilResetFormatted}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.resetTime"]||"Reset Time"}</span>
                <span class="info-value small">${e.resetTimeDisplay||"N/A"}</span>
            </div>
            <div class="info-row">
                <span>${n["dashboard.status"]||"Status"}</span>
                <span class="info-value" style="color: ${s}">
                    ${Xe(a)}
                </span>
            </div>
        `;let g=h.querySelector(".rename-model-btn");g&&g.addEventListener("click",v=>{v.stopPropagation(),Mt(e.modelId,l,c)}),w.appendChild(h)}let U={announcements:[],unreadIds:[],popupAnnouncement:null},_=null,ct=new Set;function lt(){let e=document.getElementById("announcement-badge");if(e){let t=U.unreadIds.length;t>0?(e.textContent=t>9?"9+":t,e.classList.remove("hidden")):e.classList.add("hidden")}}function dt(){u.postMessage({command:"announcement.getState"});let e=document.getElementById("announcement-list-modal");e&&e.classList.remove("hidden")}function rt(){let e=document.getElementById("announcement-list-modal");e&&e.classList.add("hidden")}function un(){let e=document.getElementById("announcement-list");if(!e)return;let t=U.announcements||[];if(t.length===0){e.innerHTML=`<div class="announcement-empty">${n["announcement.empty"]||"No notifications"}</div>`;return}let o={feature:"\u2728",warning:"\u26A0\uFE0F",info:"\u2139\uFE0F",urgent:"\u{1F6A8}"};e.innerHTML=t.map(a=>{let s=U.unreadIds.includes(a.id),i=o[a.type]||"\u2139\uFE0F",l=mn(a.createdAt);return`
                <div class="announcement-item ${s?"unread":""}" data-id="${a.id}">
                    <span class="announcement-icon">${i}</span>
                    <div class="announcement-info">
                        <div class="announcement-title">
                            ${s?'<span class="announcement-unread-dot"></span>':""}
                            <span>${a.title}</span>
                        </div>
                        <div class="announcement-summary">${a.summary}</div>
                        <div class="announcement-time">${l}</div>
                    </div>
                </div>
            `}).join(""),e.querySelectorAll(".announcement-item").forEach(a=>{a.addEventListener("click",()=>{let s=a.dataset.id,i=t.find(l=>l.id===s);if(i){if(U.unreadIds.includes(s)){u.postMessage({command:"announcement.markAsRead",id:s}),U.unreadIds=U.unreadIds.filter(c=>c!==s),lt(),a.classList.remove("unread");let l=a.querySelector(".announcement-unread-dot");l&&l.remove()}ut(i,!0),rt()}})})}function mn(e){let t=new Date(e),a=new Date-t,s=Math.floor(a/6e4),i=Math.floor(a/36e5),l=Math.floor(a/864e5);return s<1?n["announcement.timeAgo.justNow"]||"Just now":s<60?(n["announcement.timeAgo.minutesAgo"]||"{count}m ago").replace("{count}",s):i<24?(n["announcement.timeAgo.hoursAgo"]||"{count}h ago").replace("{count}",i):(n["announcement.timeAgo.daysAgo"]||"{count}d ago").replace("{count}",l)}function ut(e,t=!1){_=e;let o={feature:n["announcement.type.feature"]||"\u2728 New Feature",warning:n["announcement.type.warning"]||"\u26A0\uFE0F Warning",info:n["announcement.type.info"]||"\u2139\uFE0F Info",urgent:n["announcement.type.urgent"]||"\u{1F6A8} Urgent"},a=document.getElementById("announcement-popup-type"),s=document.getElementById("announcement-popup-title"),i=document.getElementById("announcement-popup-content"),l=document.getElementById("announcement-popup-action"),c=document.getElementById("announcement-popup-got-it"),r=document.getElementById("announcement-popup-back"),d=document.getElementById("announcement-popup-close");if(a&&(a.textContent=o[e.type]||o.info,a.className=`announcement-type-badge ${e.type}`),s&&(s.textContent=e.title),i){let p=`<div class="announcement-text">${ie(e.content).replace(/\n/g,"<br>")}</div>`;if(e.images&&e.images.length>0){p+='<div class="announcement-images">';for(let m of e.images)p+=`
                        <div class="announcement-image-item">
                            <img src="${ie(m.url)}" 
                                 alt="${ie(m.alt||m.label||"")}" 
                                 class="announcement-image"
                                 data-preview-url="${ie(m.url)}"
                                 title="${n["announcement.clickToEnlarge"]||"Click to enlarge"}" />
                            <div class="image-skeleton"></div>
                            ${m.label?`<div class="announcement-image-label">${ie(m.label)}</div>`:""}
                        </div>
                    `;p+="</div>"}i.innerHTML=p,i.querySelectorAll(".announcement-image").forEach(m=>{m.addEventListener("load",()=>{m.classList.add("loaded")}),m.addEventListener("error",()=>{let h=m.closest(".announcement-image-item");if(h){let g=h.querySelector(".image-skeleton");g&&g.remove(),m.style.display="none";let v=document.createElement("div");v.className="image-load-error",v.innerHTML=`
                            <span class="icon">\u{1F5BC}\uFE0F</span>
                            <span>${n["announcement.imageLoadFailed"]||"Image failed to load"}</span>
                        `,h.insertBefore(v,h.firstChild)}}),m.addEventListener("click",()=>{let h=m.getAttribute("data-preview-url");h&&mt(h)})})}e.action&&e.action.label?(l&&(l.textContent=e.action.label,l.classList.remove("hidden")),c&&c.classList.add("hidden")):(l&&l.classList.add("hidden"),c&&c.classList.remove("hidden")),t?(r&&(r.classList.remove("hidden"),r.onclick=()=>{J(!0),dt()}),d&&(d.onclick=()=>{J(!0)})):(r&&r.classList.add("hidden"),d&&(d.onclick=()=>{J()}));let f=document.getElementById("announcement-popup-modal");f&&f.classList.remove("hidden")}function J(e=!1){let t=document.getElementById("announcement-popup-modal"),o=t?.querySelector(".announcement-popup-content"),a=document.getElementById("announcement-btn");if(t&&o&&a&&!e){let s=a.getBoundingClientRect(),i=o.getBoundingClientRect(),l=s.left+s.width/2-(i.left+i.width/2),c=s.top+s.height/2-(i.top+i.height/2);o.style.transition="transform 0.4s ease-in, opacity 0.4s ease-in",o.style.transform=`translate(${l}px, ${c}px) scale(0.1)`,o.style.opacity="0",a.classList.add("bell-shake"),setTimeout(()=>{t.classList.add("hidden"),o.style.transition="",o.style.transform="",o.style.opacity="",a.classList.remove("bell-shake")},400)}else t&&t.classList.add("hidden");_=null}function pn(){_&&u.postMessage({command:"announcement.markAsRead",id:_.id}),J()}function gn(){if(_&&_.action){let e=_.action;u.postMessage({command:"announcement.markAsRead",id:_.id}),e.type==="tab"?Qe(e.target):e.type==="url"?u.postMessage({command:"openUrl",url:e.target}):e.type==="command"&&u.postMessage({command:"executeCommand",commandId:e.target,commandArgs:e.arguments||[]})}J()}function fn(){u.postMessage({command:"announcement.markAllAsRead"}),S(n["announcement.markAllRead"]||"All marked as read","success")}function hn(e){U=e,lt(),un(),e.popupAnnouncement&&!ct.has(e.popupAnnouncement.id)&&(ct.add(e.popupAnnouncement.id),setTimeout(()=>{ut(e.popupAnnouncement)},600))}function mt(e){let t=document.createElement("div");t.className="image-preview-overlay",t.innerHTML=`
            <div class="image-preview-container">
                <img src="${e}" class="image-preview-img" />
                <div class="image-preview-hint">${n["announcement.clickToClose"]||"Click to close"}</div>
            </div>
        `,t.addEventListener("click",()=>{t.classList.add("closing"),setTimeout(()=>t.remove(),200)}),document.body.appendChild(t),requestAnimationFrame(()=>t.classList.add("visible"))}window.showImagePreview=mt,ft()})();})();
