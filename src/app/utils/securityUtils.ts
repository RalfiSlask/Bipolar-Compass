/**
 * We sanitize html by stripping it of text content
 * @param {string} html
 * @returns void
 */
export const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
