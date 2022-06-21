<?php
//Maneja la tabla de cliente  de la base de datos
//Contiene validaciones de validator

class cliente extends validator
{
    //Declaración de atributos (propiedades)
    private $id_cliente = null;
    private $nombre_cliente = null;
    private $correo = null;

    //Metodos para setear los valores de los campos
    //Id de cliente
    public function setId($value)
    {
        $this->id_cliente = $value;
        return true;

    }

    //Nombre de cliente
    public function setNombre($value)
    {
        $this->nombre_cliente = $value;
        return true;
        
    }

    //Correo de cliente
    public function setCorreo($value)
    {
        $this->Correo = $value;
        return true;
        
    }

    //Metodos para obtener los valores de los campos
    //Id de cliente
    public function getId($value)
    {
        return $this->id_cliente;
        
    }

    //Nombre de cliente
    public function getNombre($value)
    {
        return $this->nombre_cliente;
        
    }

    //Correo de cliente
    public function getVisiblidad($value)
    {
        return $this->Correo;
        
    }

    //Metodos para realizar las operaciones SCRUD(Create)

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO cliente(
            nombre_cliente, correo)
            VALUES (?, ?)';
        $params = array($this->nombre_cliente, $this->correo);
        return Database::executeRow($sql, $params);
    }
}