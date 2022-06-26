<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class clientes extends validator
{
    //Declaración de atributos (propiedades)
    private $id_cliente = null;
    private $nombre_cliente = null;
    private $correo = null;

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Tipo de Acabados - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    //Correo - Varchar
    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_cliente;
    }

    //Nombre de Tipo de Acabados - Varchar
    public function getNombre()
    {
        return $this->nombre_cliente;
    }

    //Visibilidad - Boolean
    public function getVisibilidad()
    {
        return $this->correo;
    }
    
    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(tipo_acabado)
    public function searchRows($value)
    {
        $sql = 'SELECT id_cliente, nombre_cliente, correo
        FROM public.cliente
        WHERE nombre_cliente ILIKE ? OR correo ILIKE ?';
        $params = array("%$value%","%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, correo
        FROM public.cliente';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(tipo_acabado, visibilidad)
    public function createRow(){
        $sql = 'INSERT INTO public.cliente(
            nombre_cliente, correo)
            VALUES (?, ?)';
        $params = array($this->nombre_cliente, $this->correo);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la actualización UPDATE
    //(tipo_acabado, visibilidad, id_tipo_acabado)
    public function updateRow(){
        $sql = 'UPDATE public.cliente
        SET nombre_cliente=?, correo=?
        WHERE id_cliente=?';
        $params = array($this->nombre_cliente, $this->correo, $this->id_cliente);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_acabado)
    public function deleteRow(){
        $sql = 'DELETE FROM public.cliente
        WHERE id_cliente =?'; 
        $params = array($this->id_cliente);
        return Database::executeRow($sql,$params);
    }
}
