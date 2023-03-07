export const nameToSlug = name => {
  return `field_${name
    // Terrible regex, I know..
    .toLowerCase()
    .replace(/-/g, '_')
    .replace(/\(|\)/g, '')
    .replace(/\./g, '')
    .replace(/\,/g, '')
    .replace(/’/g, '')
    .replace(/ /g, '_')}`;
};

export const previewFromDocumentStore = (docStoreURL, isPdf = true) => {
  let pdf = docStoreURL.split('/');
  let id = parseInt(pdf[pdf.length - 1].split('.')[0]);
  return isPdf
    ? `${window.location.origin}/system/file-store/upload/preview-full-pdf/${id}/`
    : `${window.location.origin}/system/file-store/download/${id}/`;
};
