import { Component } from '@angular/core';
import { Api } from '../../providers';
import { Alert } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'solicitud-mesa',
  templateUrl: 'solicitud-mesa.html'
})
export class SolicitudMesaComponent {


  constructor(
    public api: Api,
    public toastCtrl: ToastController
  ) {
    
   
  }

  SolicitarMesa(){
    let usuario = JSON.parse(sessionStorage.getItem('usuario')); 
    

    this.api.get("SolicitudMesa",usuario).subscribe(
      (response: any) => {
        
        const toast = this.toastCtrl.create({
          message: "Se ha enviado la solicitud de mesa. En breve nuestro Staff te contactara.",
          //duration: 5000,
          closeButtonText: 'OK',
          showCloseButton: true,
          position: 'middle',
          cssClass: 'toastPedido'
        });
        toast.present();
      
      }
    );
    
  
  }

}
