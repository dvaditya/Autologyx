const extractForm = () => {
  const $ = window.$;
  const fields = [];

  $('input, textarea').each(function () {
    let $this = $(this);
    let id = $this.attr('id');
    if (typeof id !== 'undefined' && id.indexOf('id_field') !== -1) {
      fields.push({
        id: $this.attr('id').replace('id_field_', ''),
        type: $this.get(0).tagName,
        value: $this.val(),
      });
    }
  });

  // TODO add options
  $('select').each(function () {
    let $this = $(this);
    let id = $this.attr('id');
    if (typeof id !== 'undefined' && id.indexOf('id_field') !== -1) {
      fields.push({
        id: $this.attr('id').replace('id_field_', ''),
        type: $this.get(0).tagName,
        value: $this.val(),
      });
    }
  });

  return {
    fields,
    apiKey: $('#id_api_key').val(),
    csrfToken: $("[name='csrfmiddlewaretoken']").val(),
    urlPath: window.location.pathname,
  };
};

export default extractForm;
