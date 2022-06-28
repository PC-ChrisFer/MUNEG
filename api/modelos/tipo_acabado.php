<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class tipo_acabado extends validator
{
    //Declaración de atributos (propiedades)
    private $id_tipo_acabado = null;
    private $tipo_acabado = null;
    private $visibilidad = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_acabado = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Tipo de Acabados - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->tipo_acabado = $value;
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
        return $this->id_tipo_acabado;
    }

    //Nombre de Tipo de Acabados - Varchar
    public function getNombre()
    {
        return $this->tipo_acabado;
    }

    //Visibilidad - Boolean
    public function getVisibilidad()
    {
        return $this->visibilidad;
    }
    
    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(tipo_acabado)
    public function searchRows($value)
    {
        $sql = 'SELECT id_tipo_acabado, nombre_tipo
        FROM public.tipo_acabado
        WHERE nombre_tipo ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_tipo_acabado, nombre_tipo
        FROM public.tipo_acabado';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(tipo_acabado, visibilidad)
    public function createRow(){
        $sql = 'INSERT INTO public.tipo_acabado(
        nombre_tipo, visibilidad)
        VALUES (?, ?)';
        $params = array($this->tipo_acabado, $this->true);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la actualización UPDATE
    //(tipo_acabado, visibilidad, id_tipo_acabado)
    public function updateRow(){
        $sql = 'UPDATE public.tipo_acabado
        SET nombre_tipo=?, visibilidad=?
        WHERE id_tipo_acabado=?';
        $params = array($this->tipo_acabado, $this->visibilidad, $this->id_tipo_acabado);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_acabado)
    public function deleteRow(){
        $sql = 'UPDATE public.tipo_acabado
        SET visibilidad=?
        WHERE id_tipo_acabado=?';
        $params = array($this->false, $this->id_tipo_acabado);
        return Database::executeRow($sql,$params);
    }
}
