import sanitizeHtml from "sanitize-html";

const color = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i];

export function clean(html: string = ""): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "u",
      "s",
      "mark",
      "span",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "div",
    ]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "class", "loading"],
      "*": ["style", "class"],
    },
    allowedStyles: {
      "*": {
        color,
        "background-color": color,
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    transformTags: {
      a: (tag, attribs) => {
        const external = /^https?:\/\//.test(attribs.href || "");
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
          },
        };
      },
      img: (tag, attribs) => {
        const src = (attribs.src || "").trim();
        const alt = (attribs.alt || "").trim();

        // If the image tag has no src or an invalid source
        if (!src || (!src.startsWith("http://") && !src.startsWith("https://") && !src.startsWith("data:image/"))) {
          if (alt) {
            return {
              tagName: "div",
              attribs: {
                class:
                  "my-6 p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 text-zinc-300 text-xs flex flex-col items-center justify-center text-center gap-1",
              },
              text: `📊 [Chart / Image]: ${alt}`,
            };
          }
          return {
            tagName: "span",
            attribs: { class: "hidden" },
            text: "",
          };
        }

        return {
          tagName: "img",
          attribs: {
            ...attribs,
            src,
            alt: alt || "Article illustration",
            loading: "lazy",
            class: "rounded-xl border border-zinc-800 my-6 max-w-full h-auto shadow-lg",
          },
        };
      },
    },
  });
}

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
