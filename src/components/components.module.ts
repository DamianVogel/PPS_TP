import { NgModule } from '@angular/core';

import { AltaMesaComponent } from './alta-mesa/alta-mesa';

import { AltaDuenoComponent } from './alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado';
import { SolicitudMesaComponent } from './solicitud-mesa/solicitud-mesa';
import { IonicModule } from 'ionic-angular'
@NgModule({
	declarations: [SolicitudMesaComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
],
	imports: [IonicModule],
	exports: [SolicitudMesaComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
]
})
export class ComponentsModule {}
