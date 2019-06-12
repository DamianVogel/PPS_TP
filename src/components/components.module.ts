import { NgModule } from '@angular/core';

import { AltaMesaComponent } from './alta-mesa/alta-mesa';

import { AltaDuenoComponent } from './alta-dueno/alta-dueno';
import { AltaEmpleadoComponent } from './alta-empleado/alta-empleado';
import { SolicitudMesaComponent } from './solicitud-mesa/solicitud-mesa';
import { IonicModule } from 'ionic-angular'
import { ListapedidosComponent } from './listapedidos/listapedidos';
@NgModule({
	declarations: [SolicitudMesaComponent,
    ListapedidosComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
],
	imports: [IonicModule],
	exports: [SolicitudMesaComponent,
    ListapedidosComponent
	//AltaEmpleadoComponent
	//AltaDuenoComponent
	//AltaDueñoComponent
	//AltaMesaComponent
]
})
export class ComponentsModule {}
