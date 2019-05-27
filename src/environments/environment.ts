// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// messagingSenderId: "645548437433"

import { SpinnerPage } from "../pages/pages-spinner/pages-spinner";
import * as firebase from 'firebase';

export const environment = {
    production: false,
    firebase: {
      apiKey: "AIzaSyAM-VSDDi0jqIXQxjdMh71lxTfTlpQEFpI",
      authDomain: "practicaprofesional-dbd4e.firebaseapp.com",
      databaseURL: "https://practicaprofesional-dbd4e.firebaseio.com",
      projectId: "practicaprofesional-dbd4e",
      storageBucket: "practicaprofesional-dbd4e.appspot.com",
      messagingSenderId: "273959203301"
    }
};

export const showAlert = function (alertCtrl: any, title: string, message: string, cssClass?: string) {
  let alert = alertCtrl.create({
    title: title,
    message: message,
    cssClass: (cssClass === undefined) ? 'alertConfirm': cssClass,
    buttons: [
      {
        text: 'Ok',
        handler: () => {

        }
      }
    ]
  });
  alert.present();
}

export const spin = function (modalCtrl:any, spinner:any, status: boolean) {
  if(spinner === undefined && status === true) {
    spinner = modalCtrl.create(SpinnerPage);
    spinner.present();
  } else if(spinner !== undefined && status === false) {
    spinner.dismiss();
    spinner = undefined;
  }
}

export const wait = function (ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

export const uploadImage = function(image: string, path: string): any {
  let data = this.getBlob(image);
  let storageRef =  firebase.storage().ref();
  let imageRef = storageRef.child(path);
  imageRef.put(data).then((snapshot) => {
    console.log('Imagen subida exitosamente: '+path);
  });
}

export const getBlob = function(b64Data): any {
  let contentType = '';
  let sliceSize = 512;

  b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

export const round = function(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}