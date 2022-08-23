<?php
//Maneja la tabla de contrato  de la base de datos
//Contiene validaciones de validator

class factura extends validator
{
    //Declaración de atributos (propiedades)
    private $id_factura = null;
    private $codigo_factura = null;
    private $descripcion = null;
    private $direccion = null;
    private $subtotal = null;
    private $IVA = null;
    private $venta_gravada = null;
    private $fecha = null;
    private $id_inquilino = null;


    //Metodos para setear los valores de los campos
    //Id
    public function setId($value)
    {
        $this->id_factura = $value;
        return true;
    }
    //Código Factura
    public function setCodigo($value)
    {
        $this->codigo_factura = $value;
        return true;
    }
    //Descripción
    public function setDescripcion($value)
    {
        $this->descripcion = $value;
        return true;
    }
    //Dirección
    public function setDireccion($value)
    {
        $this->direccion = $value;
        return true;
    }
    //Subtotal
    public function setSubtotal($value)
    {
        $this->subtotal = $value;
        return true;
    }
    //IVA
    public function setIVA($value)
    {
        $this->IVA = $value;
        return true;
    }
    //Venta Gravada
    public function setVenta($value)
    {
        $this->venta_gravada = $value;
        return true;
    }
    //Fecha
    public function setFecha($value)
    {
        $this->fecha = $value;
        return true;
    }
    //Id Inquilino
    public function setIdInquilino($value)
    {
        $this->id_inquilino = $value;
        return true;
    }

    //Métodos para obtener los valores de los cambios

    //Id Factura
    public function getId($value)
    {
        return $this->id_factura;
        
    }
    //Codigo Factura
    public function getCodigo($value)
    {
        return $this->codigo_factura;
        
    }
    //Descripción
    public function getDescripcion($value)
    {
        return $this->descripcion;
        
    }
    //Dirección
    public function getDireccion($value)
    {
        return $this->direccion;
        
    }
    //Subtotal
    public function getSubtotal($value)
    {
        return $this->subtotal;
        
    }
    //IVA
    public function getIVA($value)
    {
        return $this->IVA;
        
    }
    //Venta Gravada
    public function getGravada($value)
    {
        return $this->venta_gravada;
        
    }
    //Fecha
    public function getFecha($value)
    {
        return $this->fecha;
        
    }
    //Id Inquilino
    public function getIdInquilino($value)
    {
        return $this->id_inquilino;
        
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_factura, codigo_factura, descripcion, direccion, subtotal, "IVA", venta_gravada, fecha, id_inquilino
        FROM public.factura
        WHERE codigo_factura ILIKE ? ';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO public.factura(
        codigo_factura, descripcion, direccion, subtotal, "IVA", venta_gravada, fecha, id_inquilino)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->codigo_factura, $this->descripcion, $this->direccion, $this->subtotal, $this->IVA, $this->venta_gravada, $this->fecha, $this->id_inquilino);
        return Database::executeRow($sql, $params);
    }
    
    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE public.factura
        SET codigo_factura=?, descripcion=?, direccion=?, subtotal=?, "IVA"=?, venta_gravada=?, fecha=?, id_inquilino=?
        WHERE id_factura = ?';
        $params = array($this->codigo_factura, $this->descripcion, $this->direccion, $this->subtotal, $this->IVA, $this->venta_gravada, $this->fecha, $this->id_inquilino, $this->id_factura);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.factura
	    WHERE id_factura = ?';
        $params = array($this->id_factura);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_factura, codigo_factura, descripcion, direccion, subtotal, "IVA", venta_gravada, fecha, id_inquilino
        FROM public.factura';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_factura, codigo_factura, descripcion, direccion, subtotal, "IVA", venta_gravada, fecha, id_inquilino
        FROM public.factura
        WHERE id_factura = ?';
        $params = ($this->id_factura);
        return Database::getRow($sql, $params);
    }

    //Llenar combobox
    //Combobox del Inquilino
    public function readInquilino()
    {
        $sql = 'SELECT  id_inquilino, nombre
        FROM inquilino
        WHERE id_estado_inquilino = 1 OR id_estado_inquilino = 2';
        $params = null;
        return Database::getRows($sql, $params);
    }
}