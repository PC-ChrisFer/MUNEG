<?php
//Maneja la tabla de pedido  de la base de datos
//Contiene validaciones de validator

class Reportes_PDF extends Validator
{

    //Declaración de atributos (propiedades)
    private $fecha_firma = null;
    private $fecha_factura = null;
    private $id_tipo_acabado = null;
    private $id_tipo_propiedad = null;
    private $id_tipo_propietario = null;
    private $id_departmento = null;
    private $id_factura = null;
    private $id_inquilino = null;


    //Imagen representativa de la categoria
    public function setPDF($file)
    {
        $this->imagen = $file;
        return true;
    }

    //Metodos para setear los valores de los campos
    //fecha_firma - date
    public function setFechaFirma($value)
    {
        $this->fecha_firma = $value;
        return true;
    }

    //fecha_firma - date
    public function setFechaFactura($value)
    {
        if ($this->validateDate($value)) {
            $this->fecha_factura = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id - integer
    public function setIdTipoAcabado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_acabado = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id - integer
    public function setIdTipoPropiedad($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_propiedad = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id - integer
    public function setIdTipoPropietario($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_propietario = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id - integer
    public function setIdDepartamento($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_departmento = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id - integer
    public function setIdInquilino($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_inquilino = $value;
            return true;
        } else {
            return false;
        }
    }
    //Id - integer
    public function setIdFactura($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_factura = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para obtener los valores de los campos
    //Obtener el reporte
    public function getRutapdf()
    {
        return '../reporte/';
    }

    //Obtener el id del empleado
    public function getIdEmpleado()
    {
        return $this->id_empleado;
    }

    //Obtener el id del cliente
    public function getIdCliente()
    {
        return $this->id_cliente;
    }


    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda
    //PROPIEDADES QUE SE HAN ALQUILADO/VENDIDO DURANTE UN MES (fecha_firma)
    public function readPropiedadVendidasAlquiladas()
    {
        $sql = 'SELECT direccion, codigo, precio, municipio, departamento, inquilino.id_inquilino, nombre, apellido FROM propiedad 
        INNER JOIN inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN departamento
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN contrato
        ON contrato.id_propiedad = propiedad.id_propiedad
        WHERE EXTRACT(MONTH FROM fecha_firma) = ?';
        $params = array($this->fecha_firma);
        return Database::getRows($sql, $params);
    }

    //PROPIEDADES CLASIFICADAS POR SU TIPO DE ACABADO (id_tipo_acabado)
    public function readPropiedadTipoAcabado()
    {
        $sql = 'SELECT direccion, codigo, precio, municipio, departamento, inquilino.id_inquilino, tipo_acabado.nombre_tipo, nombre, apellido FROM propiedad 
        INNER JOIN inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN departamento
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        WHERE tipo_acabado.id_tipo_acabado = ?';
        $params = array($this->id_tipo_acabado);
        return Database::getRows($sql, $params);
    }


    //PROPIEDADES CLASIFICADAS POR EL DEPARTAMENTO EN EL QUE SE ENCUENTRA (id_departamento)
        public function readPropiedadMunicipio()
        {
        $sql = 'SELECT direccion, codigo, precio, municipio, inquilino.id_inquilino, nombre, apellido FROM propiedad 
        INNER JOIN inquilino
             ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN municipio
        ON propiedad.id_municipio = municipio.id_municipio 
        WHERE municipio.id_municipio = ?';
        $params = array($this->id_municipio);
        return Database::getRows($sql, $params);
        }

    //FACTURA RECIENTMENTE EFECTUADA
    public function readFactura()
    {
        $sql = 'SELECT codigo_factura, descripcion, subtotal, "IVA", venta_gravada, fecha, nombre, apellido FROM factura
        INNER JOIN inquilino
        ON inquilino.id_inquilino = factura.id_inquilino
        WHERE id_factura = ?
        ORDER BY id_factura DESC
        LIMIT 1';
        $params = array($this->id_factura);
            return Database::getRows($sql, $params);
    }

    //FACTURAS EFECTUADAS DURANTE CIERTO MES (fecha_factura)
    public function readFacturaMes()
    {
        $sql = 'SELECT codigo_factura, descripcion, subtotal, "IVA", venta_gravada, fecha, nombre, apellido FROM factura
        INNER JOIN inquilino
        ON inquilino.id_inquilino = factura.id_inquilino
        WHERE EXTRACT(MONTH FROM fecha) = ?
        ORDER BY id_factura DESC';
        $params = array($this->fecha_factura);
        return Database::getRow($sql, $params);
    }



    //FACTURAS EFECTUADAS DURANTE CIERTO MES (fecha_factura)
    public function readFacturaMes()
    {
        $sql = 'SELECT codigo_factura, descripcion, subtotal, "IVA", venta_gravada, fecha, nombre, apellido FROM factura
        INNER JOIN inquilino
        ON inquilino.id_inquilino = factura.id_inquilino
        ORDER BY id_factura DESC
        WHERE EXTRACT(MONTH FROM fecha) = ?';
        $params = array($this->fecha_factura);
        return Database::getRows($sql, $params);
    }

    // PROPIETARIOS SEGÚN TIPO PROPIETARIO (id_tipo_propietario)
    public function readPropietarioTipoPropietario()
    {
        $sql = 'SELECT nombre, apellido, correo_electronico, fecha_nacimiento, propietario.id_tipo_propietario ,nombre_tipo FROM propietario
        INNER JOIN tipo_propietario
        ON tipo_propietario.id_tipo_propietario = propietario.id_tipo_propietario
        WHERE propietario.id_tipo_propietario = ?';
        $params = array($this->id_tipo_propietario);
        return Database::getRows($sql, $params);
    }


    // PROPIETARIOS SEGÚN TIPO PROPIETARIO (id_tipo_propietario)
    public function readTotalTipoAcabado()
    {
        $sql = 'SELECT tipo_acabado.id_tipo_acabado, nombre_tipo, propiedad.id_propiedad, codigo FROM tipo_acabado
        INNER JOIN propiedad
        ON tipo_acabado.id_tipo_acabado = propiedad.id_tipo_acabado
        GROUP BY tipo_acabado.id_tipo_acabado, propiedad.id_propiedad
        ORDER BY nombre_tipo';
        $params = null;
        return Database::getRows($sql, $params);
    }

    // PROPIEDADES  CON LOS PRECIOS MÁS BAJOS (ACCESIBLES)
    public function readPropiedadesAccesibles()
    {
        $sql = 'SELECT direccion, codigo, precio, municipio, departamento, inquilino.id_inquilino, nombre, apellido FROM propiedad 
        INNER JOIN inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN departamento
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        ORDER BY precio';
        $params = null;
        return Database::getRows($sql, $params);
    }

    // PROPIEDADES  CON LOS PRECIOS MÁS ALTOS (VALIOSAS)
    public function readPropiedadesValiosas()
    {
        $sql = 'SELECT direccion, codigo, precio, municipio, departamento, inquilino.id_inquilino, nombre, apellido FROM propiedad 
        INNER JOIN inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN departamento
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        ORDER BY precio DESC';
        $params = null;
        return Database::getRows($sql, $params);
    }
}
