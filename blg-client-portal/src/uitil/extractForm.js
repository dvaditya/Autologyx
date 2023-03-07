const extractForm = () => {
    const $ = window.$;
    const fields = [];
  
    const form = document.querySelector('#target_form')
    console.log("form", form)
    fields.push({
        type: 'form',
        action: form.action,
        id: form.id,
    })

    $('input, textarea').each(function () {
      let $this = $(this);
      let id = $this.attr('id');
      if (typeof id !== 'undefined' && id.indexOf('id_field') !== -1) {
        fields.push({
          id: $this.attr('id').replace('id_field_', ''),
          type: $this.get(0).tagName,
          value: $this.val()
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
          value: $this.val()
  
        });
      }
    });
    const emailEl = document.querySelector('#id_field_email')
    let emailId = 0
    if (emailEl.attributes.default) {
      emailId = parseInt(emailEl.attributes.default.value)
    }
    
    return {
      fields,
      apiKey: $('#id_api_key').val(),
      csrfToken: $("[name='csrfmiddlewaretoken']").val(),
      urlPath: window.location.pathname,
      emailId,
    };
  };
  
  export default extractForm;
  