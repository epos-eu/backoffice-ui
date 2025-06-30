import "./chunk-KBUIKKCC.js";

// node_modules/.pnpm/jsondiffpatch@0.6.0/node_modules/jsondiffpatch/lib/formatters/base.js
var trimUnderscore = (str) => {
  if (str.substring(0, 1) === "_") {
    return str.slice(1);
  }
  return str;
};
var arrayKeyToSortNumber = (key) => {
  if (key === "_t") {
    return -1;
  } else {
    if (key.substring(0, 1) === "_") {
      return parseInt(key.slice(1), 10);
    } else {
      return parseInt(key, 10) + 0.1;
    }
  }
};
var arrayKeyComparer = (key1, key2) => arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
var BaseFormatter = class {
  format(delta, left) {
    const context = {};
    this.prepareContext(context);
    const preparedContext = context;
    this.recurse(preparedContext, delta, left);
    return this.finalize(preparedContext);
  }
  prepareContext(context) {
    context.buffer = [];
    context.out = function(...args) {
      this.buffer.push(...args);
    };
  }
  typeFormattterNotFound(context, deltaType) {
    throw new Error(`cannot format delta type: ${deltaType}`);
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom) {
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
  finalize({
    buffer
  }) {
    if (Array.isArray(buffer)) {
      return buffer.join("");
    }
  }
  recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
    const useMoveOriginHere = delta && movedFrom;
    const leftValue = useMoveOriginHere ? movedFrom.value : left;
    if (typeof delta === "undefined" && typeof key === "undefined") {
      return void 0;
    }
    const type = this.getDeltaType(delta, movedFrom);
    const nodeType = type === "node" ? delta._t === "a" ? "array" : "object" : "";
    if (typeof key !== "undefined") {
      this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
    } else {
      this.rootBegin(context, type, nodeType);
    }
    let typeFormattter;
    try {
      typeFormattter = type !== "unknown" ? this[`format_${type}`] : this.typeFormattterNotFound(context, type);
      typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
    } catch (err) {
      this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
      if (typeof console !== "undefined" && console.error) {
        console.error(err.stack);
      }
    }
    if (typeof key !== "undefined") {
      this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
    } else {
      this.rootEnd(context, type, nodeType);
    }
  }
  formatDeltaChildren(context, delta, left) {
    this.forEachDeltaKey(delta, left, (key, leftKey, movedFrom, isLast) => {
      this.recurse(context, delta[key], left ? left[leftKey] : void 0, key, leftKey, movedFrom, isLast);
    });
  }
  forEachDeltaKey(delta, left, fn) {
    const keys = Object.keys(delta);
    const arrayKeys = delta._t === "a";
    const moveDestinations = {};
    let name;
    if (typeof left !== "undefined") {
      for (name in left) {
        if (Object.prototype.hasOwnProperty.call(left, name)) {
          if (typeof delta[name] === "undefined" && (!arrayKeys || typeof delta[`_${name}`] === "undefined")) {
            keys.push(name);
          }
        }
      }
    }
    for (name in delta) {
      if (Object.prototype.hasOwnProperty.call(delta, name)) {
        const value = delta[name];
        if (Array.isArray(value) && value[2] === 3) {
          const movedDelta = value;
          moveDestinations[`${movedDelta[1]}`] = {
            key: name,
            value: left && left[parseInt(name.substring(1), 10)]
          };
          if (this.includeMoveDestinations !== false) {
            if (typeof left === "undefined" && typeof delta[movedDelta[1]] === "undefined") {
              keys.push(movedDelta[1].toString());
            }
          }
        }
      }
    }
    if (arrayKeys) {
      keys.sort(arrayKeyComparer);
    } else {
      keys.sort();
    }
    for (let index = 0, length = keys.length; index < length; index++) {
      const key = keys[index];
      if (arrayKeys && key === "_t") {
        continue;
      }
      const leftKey = arrayKeys ? parseInt(trimUnderscore(key), 10) : key;
      const isLast = index === length - 1;
      fn(key, leftKey, moveDestinations[leftKey], isLast);
    }
  }
  getDeltaType(delta, movedFrom) {
    if (typeof delta === "undefined") {
      if (typeof movedFrom !== "undefined") {
        return "movedestination";
      }
      return "unchanged";
    }
    if (Array.isArray(delta)) {
      if (delta.length === 1) {
        return "added";
      }
      if (delta.length === 2) {
        return "modified";
      }
      if (delta.length === 3 && delta[2] === 0) {
        return "deleted";
      }
      if (delta.length === 3 && delta[2] === 2) {
        return "textdiff";
      }
      if (delta.length === 3 && delta[2] === 3) {
        return "moved";
      }
    } else if (typeof delta === "object") {
      return "node";
    }
    return "unknown";
  }
  parseTextDiff(value) {
    const output = [];
    const lines = value.split("\n@@ ");
    for (let i = 0, l = lines.length; i < l; i++) {
      const line = lines[i];
      const lineOutput = {
        pieces: []
      };
      const location = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
      lineOutput.location = {
        line: location[0],
        chr: location[1]
      };
      const pieces = line.split("\n").slice(1);
      for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
        const piece = pieces[pieceIndex];
        if (!piece.length) {
          continue;
        }
        const pieceOutput = {
          type: "context"
        };
        if (piece.substring(0, 1) === "+") {
          pieceOutput.type = "added";
        } else if (piece.substring(0, 1) === "-") {
          pieceOutput.type = "deleted";
        }
        pieceOutput.text = piece.slice(1);
        lineOutput.pieces.push(pieceOutput);
      }
      output.push(lineOutput);
    }
    return output;
  }
};
var base_default = BaseFormatter;

// node_modules/.pnpm/jsondiffpatch@0.6.0/node_modules/jsondiffpatch/lib/formatters/html.js
var HtmlFormatter = class extends base_default {
  typeFormattterErrorFormatter(context, err) {
    context.out(`<pre class="jsondiffpatch-error">${err}</pre>`);
  }
  formatValue(context, value) {
    context.out(`<pre>${htmlEscape(JSON.stringify(value, null, 2))}</pre>`);
  }
  formatTextDiffString(context, value) {
    const lines = this.parseTextDiff(value);
    context.out('<ul class="jsondiffpatch-textdiff">');
    for (let i = 0, l = lines.length; i < l; i++) {
      const line = lines[i];
      context.out(`<li><div class="jsondiffpatch-textdiff-location"><span class="jsondiffpatch-textdiff-line-number">${line.location.line}</span><span class="jsondiffpatch-textdiff-char">${line.location.chr}</span></div><div class="jsondiffpatch-textdiff-line">`);
      const pieces = line.pieces;
      for (let pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
        const piece = pieces[pieceIndex];
        context.out(`<span class="jsondiffpatch-textdiff-${piece.type}">${htmlEscape(decodeURI(piece.text))}</span>`);
      }
      context.out("</div></li>");
    }
    context.out("</ul>");
  }
  rootBegin(context, type, nodeType) {
    const nodeClass = `jsondiffpatch-${type}${nodeType ? ` jsondiffpatch-child-node-type-${nodeType}` : ""}`;
    context.out(`<div class="jsondiffpatch-delta ${nodeClass}">`);
  }
  rootEnd(context) {
    context.out(`</div>${context.hasArrows ? `<script type="text/javascript">setTimeout(${adjustArrows.toString()},10);<\/script>` : ""}`);
  }
  nodeBegin(context, key, leftKey, type, nodeType) {
    const nodeClass = `jsondiffpatch-${type}${nodeType ? ` jsondiffpatch-child-node-type-${nodeType}` : ""}`;
    context.out(`<li class="${nodeClass}" data-key="${leftKey}"><div class="jsondiffpatch-property-name">${leftKey}</div>`);
  }
  nodeEnd(context) {
    context.out("</li>");
  }
  format_unchanged(context, delta, left) {
    if (typeof left === "undefined") {
      return;
    }
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, left);
    context.out("</div>");
  }
  format_movedestination(context, delta, left) {
    if (typeof left === "undefined") {
      return;
    }
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, left);
    context.out("</div>");
  }
  format_node(context, delta, left) {
    const nodeType = delta._t === "a" ? "array" : "object";
    context.out(`<ul class="jsondiffpatch-node jsondiffpatch-node-type-${nodeType}">`);
    this.formatDeltaChildren(context, delta, left);
    context.out("</ul>");
  }
  format_added(context, delta) {
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, delta[0]);
    context.out("</div>");
  }
  format_modified(context, delta) {
    context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');
    this.formatValue(context, delta[0]);
    context.out('</div><div class="jsondiffpatch-value jsondiffpatch-right-value">');
    this.formatValue(context, delta[1]);
    context.out("</div>");
  }
  format_deleted(context, delta) {
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, delta[0]);
    context.out("</div>");
  }
  format_moved(context, delta) {
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, delta[0]);
    context.out(`</div><div class="jsondiffpatch-moved-destination">${delta[1]}</div>`);
    context.out(
      /* jshint multistr: true */
      `<div class="jsondiffpatch-arrow" style="position: relative; left: -34px;">
          <svg width="30" height="60" style="position: absolute; display: none;">
          <defs>
              <marker id="markerArrow" markerWidth="8" markerHeight="8"
                 refx="2" refy="4"
                     orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />
              </marker>
          </defs>
          <path d="M30,0 Q-10,25 26,50"
            style="stroke: #88f; stroke-width: 2px; fill: none; stroke-opacity: 0.5; marker-end: url(#markerArrow);"
          ></path>
          </svg>
      </div>`
    );
    context.hasArrows = true;
  }
  format_textdiff(context, delta) {
    context.out('<div class="jsondiffpatch-value">');
    this.formatTextDiffString(context, delta[0]);
    context.out("</div>");
  }
};
function htmlEscape(text) {
  let html = text;
  const replacements = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/'/g, "&apos;"], [/"/g, "&quot;"]];
  for (let i = 0; i < replacements.length; i++) {
    html = html.replace(replacements[i][0], replacements[i][1]);
  }
  return html;
}
var adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(nodeArg) {
  const node = nodeArg || document;
  const getElementText = ({
    textContent,
    innerText
  }) => textContent || innerText;
  const eachByQuery = (el, query, fn) => {
    const elems = el.querySelectorAll(query);
    for (let i = 0, l = elems.length; i < l; i++) {
      fn(elems[i]);
    }
  };
  const eachChildren = ({
    children
  }, fn) => {
    for (let i = 0, l = children.length; i < l; i++) {
      fn(children[i], i);
    }
  };
  eachByQuery(node, ".jsondiffpatch-arrow", ({
    parentNode,
    children,
    style
  }) => {
    const arrowParent = parentNode;
    const svg = children[0];
    const path = svg.children[1];
    svg.style.display = "none";
    const destination = getElementText(arrowParent.querySelector(".jsondiffpatch-moved-destination"));
    const container = arrowParent.parentNode;
    let destinationElem;
    eachChildren(container, (child) => {
      if (child.getAttribute("data-key") === destination) {
        destinationElem = child;
      }
    });
    if (!destinationElem) {
      return;
    }
    try {
      const distance = destinationElem.offsetTop - arrowParent.offsetTop;
      svg.setAttribute("height", `${Math.abs(distance) + 6}`);
      style.top = `${-8 + (distance > 0 ? 0 : distance)}px`;
      const curve = distance > 0 ? `M30,0 Q-10,${Math.round(distance / 2)} 26,${distance - 4}` : `M30,${-distance} Q-10,${Math.round(-distance / 2)} 26,4`;
      path.setAttribute("d", curve);
      svg.style.display = "";
    } catch (err) {
    }
  });
};
var showUnchanged = (show, node, delay) => {
  const el = node || document.body;
  const prefix = "jsondiffpatch-unchanged-";
  const classes = {
    showing: `${prefix}showing`,
    hiding: `${prefix}hiding`,
    visible: `${prefix}visible`,
    hidden: `${prefix}hidden`
  };
  const list = el.classList;
  if (!list) {
    return;
  }
  if (!delay) {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    list.remove(classes.visible);
    list.remove(classes.hidden);
    if (show === false) {
      list.add(classes.hidden);
    }
    return;
  }
  if (show === false) {
    list.remove(classes.showing);
    list.add(classes.visible);
    setTimeout(() => {
      list.add(classes.hiding);
    }, 10);
  } else {
    list.remove(classes.hiding);
    list.add(classes.showing);
    list.remove(classes.hidden);
  }
  const intervalId = setInterval(() => {
    adjustArrows(el);
  }, 100);
  setTimeout(() => {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    if (show === false) {
      list.add(classes.hidden);
      list.remove(classes.visible);
    } else {
      list.add(classes.visible);
      list.remove(classes.hidden);
    }
    setTimeout(() => {
      list.remove(classes.visible);
      clearInterval(intervalId);
    }, delay + 400);
  }, delay);
};
var hideUnchanged = (node, delay) => showUnchanged(false, node, delay);
var html_default = HtmlFormatter;
var defaultInstance;
function format(delta, left) {
  if (!defaultInstance) {
    defaultInstance = new HtmlFormatter();
  }
  return defaultInstance.format(delta, left);
}
export {
  html_default as default,
  format,
  hideUnchanged,
  showUnchanged
};
//# sourceMappingURL=jsondiffpatch_formatters_html.js.map
