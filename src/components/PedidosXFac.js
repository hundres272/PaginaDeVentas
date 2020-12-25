import React from 'react';
import PedidosXFacPro from './PedidosXFacPro';
import './styles/pedidosxfac.css';

function PedidoXFac({vector}){
    // console.log(key);
    var s = 0;
    var i = 100000;
    const costosEnvio = 10000;
    var keys = vector[0].codFact+i;
    const respuesta = vector.map((clave,j) => <PedidosXFacPro key={keys+j}
        idProd={clave.idProd} cantComp={clave.cantComp} valor={clave.valor} fechaCompra={clave.fechaCompra} />);
    for (let j = 0; j < vector.length; j++) {
        s = s + parseInt(vector[j].valor);
        // console.log(vector[j]);
    }
    return (
        <div className="recuadro-factura">
            <h3 className="h3-fact-ped">
                Factura número: {vector[0].codFact}
            </h3>
            <div>Estado: {vector[0].estado}</div>
            {respuesta}
            <div className="producto-individual sumatoria">
                <div>Costo de envio: $ 10.000 cop</div>
                Total: $ {new Intl.NumberFormat("de-DE").format(s+costosEnvio)} cop
            </div>
        </div>
    )
}

export default PedidoXFac;