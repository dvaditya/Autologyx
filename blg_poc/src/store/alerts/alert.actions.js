import { VIEW_DOCUMENT } from './alert.consts';
import { file, alx } from 'utils';
const viewDocument = data => {
  file.download(
    alx.previewFromDocumentStore(data.file),
    `Test Template (${data.fileName})`
  );
};

export default {
  [VIEW_DOCUMENT]: viewDocument,
};
