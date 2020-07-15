import { Request, Response } from "express";
import Encriptar from "../utils/Encriptar";
// var CryptoJS = require("../utils/AES");

import fetch from "node-fetch";
const encriptar = new Encriptar();
encriptar.init();
class PagosController {
  static GuardarTarjeta = async (_req: Request, res: Response) => {
    try {
      console.log("inicio1");
      const dataEncriptada = encriptar.encrypt({
        cardNumber: "1234567890987654",
        expirationMonth: "11",
        expirationYear: "22",
        holderName: "juan Cuesta",
        securityCode: "345",
      });
     //  let key = CryptoJS.enc.Utf8.parse("AQUI-TU-CONTRASEÑA-DE-CODIFICACIÓN");
      console.log("inicio2", dataEncriptada);
      const ClientTransactionId = Math.floor(Math.random() * 11);
      console.log("inicio3");
      const data = {
        data: dataEncriptada,
        email: "jhonnathanp27@gmail.com",
        phoneNumber: "+593999777370",
        documentId: "0106543213",
        amount: 100,
        clientTransactionId: ClientTransactionId,
        deferredType: 1,
      };
      console.log("data", data);

      const response = await fetch(
        "https://pay.payphonetodoesposible.com/api/v2/transaction/create",
        {
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer ViJHC_pj7OT3R-PJowmJAvM1d4lLK7mKPMNEh1YDaH8MIFPxIWbQEuYaAw1Jm9so4qx96nQfGowqbQc4LYVEy-AFKYpE1aalccni16OlcjDQ8aXLzxt9gsgwk8mTNev_751lVnm1Zy0LKyLcFscOeoxlGVGpfKqwXB9I_e68b098NkmLvZObuWwxpOrPV7EXW7Jui1Ve8Vg9DB6mjIjlxsJz5fyk2N1JARrXnOr8Cg-8yO-j1krlTazEjGrgLx6jpn94K3X06NWpCI8ffxH2BBEWbhLZ8fsyo4FkI8E4JVfbckZ6JWfHah-5aFeckzxQgY_U4g",
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      // .then((response) => response.json())
      // .then((res) => {
      //   console.log("responsedata", res);
      // });

      console.log("response", response);

      // AmountWithTax
      // AmountWithoutTax (integer, optional):
      // Tax (integer, optional):
      // Service (integer, optional):
      // Tip (integer, optional):
      // StoreId (string, optional): El campo StoreID  solo se envía cuando se manejan diferentes tiendas
      // TerminalId (string, optional):  El id del terminal usado en la transacción.// celular
      // Currency (string, optional):  Código ISO de la moneda de la transacción.

      res.status(200).send({ transaccion: true, data: "dd" });
    } catch (error) {
      console.log(error);
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };
}

export default PagosController;

/*
{
Data (string): Datos de tarjeta codificados según el ejemplo anterior.
Email (string): 
     Correo del usuario que paga la transacción, 
PhoneNumber (string): 
     Número de teléfono del usuario que paga la transacción.
DocumentId (string): 
     CI del usuario que paga la transacción ,
Amount (integer): 
     El valor total de la factura a cobrar, este valor es la suma de 
     "AmountWithTax" más "AmountWithoutTax" más "Tax" más "Tip" más "Service".
AmountWithTax (integer, optional): 
     Subtotal del valor de los productos que gravan iva, sin el iva incluido. Solo se usa cuando el 
     tipo de facturación es con Iva o mixto.
AmountWithoutTax (integer, optional): 
     Subtotal del valor de los productos con tarifa 0% de iva. Solo se usa cuando el tipo de facturación
     es tarifa 0% o mixto.
Tax (integer, optional): 
     Suma de los impuestos o valor del iva. Solo se usa cuando el tipo de facturación es con Iva o mixto.
Service (integer, optional): 
     En caso de cobrar servicios, valor de los servicios.
Tip (integer, optional): 
     Total de la propina a cobrar
ClientTransactionId (string): 
     Identificador de la transacción proporcionado por la aplicación del cliente
StoreId (string, optional): 
     El campo StoreID  solo se envía cuando se manejan diferentes tiendas 
     o sucursales, si no se usan diferentes tiendas se puede omitir. 
     Para especificar que tienda hace el cobro el storeID se obtiene desde 
     la página web de PayPhone Developer, en la sección solicitud de compañía, 
     columna Acciones, Listado de tiendas.
TerminalId (string, optional): 
     El id del terminal usado en la transacción.
Currency (string, optional): 
     Código ISO de la moneda de la transacción.
DeferredType (string): 
     Tipo de diferido a cobrar (Se obtienen con el método Deferred explicado
     en la parte inferior de este artículo).
OptionalParameter (string, optional): 
     Parametro opcional
}

*/
