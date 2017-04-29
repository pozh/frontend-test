'use strict';

// Full profile editor
class UserEditor{

  constructor() {
    this.btnEditProfile = $('#profile-edit-ctrl .js-toggler');
    this.dlgEditProfile = $('#profile-edit-ctrl .js-dlg');
    this.btnSave = $('#profile-edit-ctrl .js-save');
    this.btnCancel = $('#profile-edit-ctrl .js-cancel');
    this.pageInfo = $('#user-info');
    this.pageEditor = $('#user-editor');

    this.btnEditProfile.on('click', e => this.toggleFullEditor(e));
    this.btnCancel.on('click', e => this.toggleFullEditor(e));
    this.btnSave.on('click', e => this.toggleFullEditor(e));
  }

  // Switch to editor mode (on smartphones)
  toggleFullEditor(event) {
    this.dlgEditProfile.toggle();
    this.btnEditProfile.toggle();
    this.pageInfo.toggle();
    this.pageEditor.toggle();
    event.preventDefault();
  }
}

// Mini Editor for user profile fields
class MiniEditor {

  constructor() {
    this.$instance = $('#minieditor');
    this.$editor = $('#minieditor-value');
    this.$label = $('#minieditor-label');
    $('.js_save', this.$instance).on('click', e => this.saveAndHide());
    $('.js_cancel', this.$instance).on('click', e => this.hide());

    // OnEnter for our editor
    this.$editor.on('keypress', (e) => {
      if (e.which == 13) {
        this.saveAndHide();
        return false;
      }
    });
  }

  // x & y - screen coordinates
  // caller - an instance of InfoCtrl
  showAt(x, y, caller) {
    this.$infoCtrl = caller;
    this.$instance.css({top: y, left: x});
    this.$label.html(caller.getType());
    this.$editor.val(caller.getValue());
    this.$instance.show();
    this.$editor.focus();
  }

  hide() {
    this.$instance.hide();
  }

  saveAndHide() {
    this.$infoCtrl.setValue(this.$editor.val());
    this.hide();
  }
}

// Information line in user details
class InfoCtrl {

  constructor(domElement) {
    this.$ctrl = $(domElement);
    this.$value = $('.js_value', this.$ctrl);
    $('.info__edit', domElement).on('click', e => this.showMiniEditor(e));
  }

  showMiniEditor(event) {
    let posX = event.pageX - 10;
    let posY = event.pageY - 20;
    miniEditor.showAt(posX,posY, this);
    event.preventDefault();
  }

  // return type of the value, "website", "address", etc.
  getType() {
    return this.$ctrl.data('type');
  }

  // return current value
  getValue() {
    return this.$value.text();
  }

  setValue(newValue) {
    this.$value.html(newValue);
  }
}


const userEditor = new UserEditor();
const miniEditor = new MiniEditor();

// User information controls
let infoLines = [];
$('#user-info .info__line').map((i, ctrl) => {
  infoLines.push(new InfoCtrl(ctrl));
});
