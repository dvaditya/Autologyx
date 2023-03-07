export const download = (href, filename = 'Download') => {
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
