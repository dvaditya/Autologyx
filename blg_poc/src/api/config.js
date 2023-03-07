import { apiConnector, url } from 'utils';

export default apiConnector({                        
  apiKey: url.getApiKey(),                           
  fieldPrefix: false,
  resources: {
    clients: {
      group: 8,
    },
    clientContacts: {
      group: 3
    },
    audits: {
      group: 1
    },
    auditConfigurations: {
      group: 6
    },
    tasks: {
      group: 4
    },
    documents: {
      group: 5
    }
  },
});
