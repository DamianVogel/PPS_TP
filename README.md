# Practica profesional - Primer cuatrimestre 2019 - Restaurante - Equipo 5

<img src="https://vignette.wikia.nocookie.net/vrchat-legends/images/f/ff/Teem_five.jpg/revision/latest?cb=20180527122115" width="400" />

## Contenidos

1. [Responsabilidades](#responsabilidades)

## <a name="responsabilidades"></a><b>Responsabilidades</b>

## ==========================================

### **Nicolas Saavedra (NicolasSaavedraBranch)**

  #### Alta de productos (platos y bebidas) (25/05/2019 - 26/05/2019)
  9) Se carga el nombre, la descripción, tiempo promedio de elaboración y el precio.
  10) Con 3 fotos tomadas del celular.
  11) Lector de código QR relacionado con los productos.
  12) Esta acción la podrá realizar el cocinero o el bar tender.

  #### Qr de ingreso al local (26/05/2019 - 04/06/2019)
  21) Para ponerse en la lista de espera (Leo QR y me agrego a la lista de espera)
  22) Para acceder a la encuesta de antiguos usuarios. (Supervisor)
  
  #### Encuestas - Supervisor (04/06/2019 - 05/06/2019)
  34) Puede seleccionar un empleado o un cliente para cargar un formulario con datos referentes al mismo.
  35) Con mínimo un tipo de cada uno de estos controles (range, input, radio, check, select).
  36) Mostrar los gráficos de las estadísticas obtenidas de cada uno de los ítems de ese empleado / cliente según corresponda.
  
  #### Gestión - Pedir platos y bebidas (15/06/2019 - 16/06/2019)
  38) Se selecciona el plato / bebida y su cantidad.
  39) Se pueden seleccionar desde un código Qr e indicar la cantidad.
  
  #### Juegos - Juego 10% de descuento (05/06/2019 - TBD)
  57) En caso de ganar se le descontará de la cuenta final el porcentaje correspondiente.
  
## ==========================================

### **Damian Vogel (DamianVogelBranch)**

  #### Login / Generacion de pages y perfiles de acceso (11/05 a 18/05)
  1) Switch de acceso para cada perfil.
  2) Adecuacion de perfiles en DB.
  3) Generacion de pages para perfiles.

  #### Alta de dueño / supervisor (TBD - TBD) (18/05 al 25/05)
  1) Se cargarán: nombre, apellido, DNI, CUIL, foto y perfil.
  2) La foto se tomará del celular.
  3) Brindar la posibilidad de contar con un lector de código QR para el DNI, que cargará la información disponible (sólo aplicable a aquellos documentos que lo posean).
  4) Esta acción la podrá realizar el supervisor o el dueño.

  #### Lectura de QR ### (01/06 al 08/06)

  1) Lectura de estado de mesa via QR.
  2) Para relacionar al cliente con una mesa.
  3) Para ver el estado del pedido.
  
  #### Firebase Function #### (01/06 al 08/06) 

  1) Investigacion y aplicacion de Firebase Functions
  2) Instalacion de dependencias.
  3) Desarrollo de obtencion de token de dispositivos en diferentes puntos de la aplicacion.
  4) Test de Push Notifications al dar de alta de usuarios.
  
  #### PUSH NOTIFICATIONS - LOG IN -SERVICIOS MESA - PERSISTENCIA PEDIDOS TEST - COMPONENTES LISTA PEDIDOS \ PRODUCTOS -###(09/06 al 15/06)
  
  1) Desarrollo de funciones en Firebase para Push Notification:
        * HTTPS - Solicitud de mesa: 
          Aviso a Mozo y Supervisores.
        * onCreate - Alta de pedido: 
          Aviso a empleados del evento.
  
  2) Adecuacion de acceso al sistema como cliente anonimo.
      * Persistencia del usuario anonimo con id en coleccion de documentos.
      * Agregado de spinner y deshabilitacion de botones en request.

  3) En formulario de registro validacion de que email no exista para un usuario registrado.

  3) Servicio Mesa:
      * Servicio de obtencion de usuario en mesa para consumir en alta de pedido.
      * Numero de mesa autoincremental de acuerdo a ultimo registro en base para nuevas altas.
      * Validacion de estado de mesa al asignar via QR. 
  
  4) Componentes Lista Pedido \ Producto:
      * Generacion de servicios para la obtencion de pedidos filtrados por estado.
      * Generacion Component Lista y Pedido para mostrar los productos de un pedido.
        Cada uno de estos cuenta con un boton de accion que cambia el estado del mismo para cumplimentar el flujo del sistema.

 
#### COMPONENTES LISTA PEDIDOS \ PRODUCTOS - JUEGO AHORCADO - DESCUENTO POR JUEGOS - CAMBIO DE ESTADO EN PEDIDO - TEST QA - PAGINAS CLIENTE ANONIMO Y REGISTRADO #### (15/06 al 22/06) 

  1) Componentes Lista Pedido \ Producto:
      * Filtro de acuerdo a tipo de producto para que sea tomado por cada responsable.

  2)  Descuento por Juegos:
      * Funcionalidad de persistencia de descuento si se juega y se gana en un pedido. Validando que puede jugar N veces pero solo gana una vez. Discriminando que tipo de descuento recibe en base al juego. 
  
  3)  Cambio de estado en pedidos:
      * Al completarse todos los productos de un pedido por los responsables el pedido se marcara automaticamente como "terminado para que el mozo pueda entregarlo a la mesa. 
  
  4)  Paginas Cliente Anonimo y Cliente Registrado:
      * Habilitacion y creacion de servicios para identificar si una mesa se encuentra ocupado por que usuario y en base a eso que opciones puede realizar, habilitando botones de acciones, etc.
  
  5)  TEST QA:
      * Test de todo el flujo de la aplicacion desde la generacion de un pedido por un usuario anonimo como por usuario registrado validando que acciones puede realizar y cuales de acuerdo a su perfil.

## ==========================================

### **Augusto Morelli (AugustoMorelli / AugustoBranch)**

  #### Alta de cliente (TBD - TBD)
  13) Se ingresará el nombre, apellido, DNI, y foto.
  14) La foto se tomará del celular.
  15) Si se registra como ‘anónimo’ solo se cargarán el nombre y la foto.
  16) Brindar la posibilidad de contar con un lector de código QR para el DNI, que cargará la información disponible (sólo aplicable a aquellos documentos que lo posean).
  17) Esta acción la podrá realizar el cliente o el metre.
