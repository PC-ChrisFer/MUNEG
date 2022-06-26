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
        $this->id_factura = $value;
        return true;
    }
    //IVA
    public function setIVA($value)
    {
        $this->IVA = $value;
        return true;
    }
    //Venta Gravada
    public function setId($value)
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
        return $this->id_factura;
        
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
    
}