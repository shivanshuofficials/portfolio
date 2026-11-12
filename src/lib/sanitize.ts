import sanitizeHtml from "sanitize-html";

const color = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i];

export function clean(html: string = ""): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "u", "s", "mark", "span"]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      "*": ["style"],
    },
    allowedStyles: {
      "*": {
        color,
        "background-color": color,
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
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
