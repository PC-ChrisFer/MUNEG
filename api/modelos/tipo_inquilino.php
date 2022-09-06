<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class tipo_inquilino extends validator
{
    //Declaración de atributos (propiedades)
    private $id_tipo_inquilino = null;
    private $tipo_inquilino = null;
    private $visibilidad = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_inquilino = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Tipo de Acabados - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->tipo_inquilino = $value;
            return true;
        } else {
            return false;
        }
    }

    //Visibilidad - Boolean
    public function setVisibilidad($value)
    {
        if ($this->validateBoolean($value)) {
            $this->visibilidad = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_tipo_inquilino;
    }

    //Nombre de Tipo de Acabados - Varchar
    public function getNombre()
    {
        return $this->tipo_inquilino;
    }

    //Visibilidad - Boolean
    public function getVisibilidad()
    {
        return $this->visibilidad;
    }
    
    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(nombre_tipo)
    public function searchRows($value)
    {
        $sql = 'SELECT id_tipo_inquilino, nombre_tipo
        FROM public.tipo_inquilino
        WHERE nombre_tipo ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_tipo_inquilino, nombre_tipo, visibilidad
        FROM public.tipo_inquilino
        WHERE visibilidad = true;';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readAllDeleted()
    {
        $sql = 'SELECT id_tipo_inquilino, nombre_tipo , visibilidad
                FROM public.tipo_inquilino
                WHERE visibilidad = false';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Metodo para la insercción INSERT
    public function createRow(){
        $sql = 'INSERT INTO public.tipo_inquilino(
        nombre_tipo, visibilidad)
        VALUES (?, ?)';
        $params = array($this->tipo_inquilino, $this->true);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la actualización UPDATE
    public function updateRow(){
        $sql = 'UPDATE public.tipo_inquilino
        SET nombre_tipo=?, visibilidad=?
        WHERE id_tipo_inquilino=?';
        $params = array($this->tipo_inquilino, $this->visibilidad, $this->id_tipo_inquilino);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la eliminación DELETE
    public function deleteRow(){
        $sql = 'UPDATE public.tipo_inquilino
        SET visibilidad=?
        WHERE id_tipo_inquilino=?';
        $params = array($this->false, $this->id_tipo_inquilino);
        return Database::executeRow($sql,$params);
    }
}
