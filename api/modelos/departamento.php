<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class departamento extends validator
{
    //Declaración de atributos (propiedades)
    private $id_departamento = null;
    private $nombre_departamento = null;
    private $estado = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_departamento = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Departamento - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 30)) {
            $this->nombre_departamento = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado - Boolean
    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_departamento;
    }

    //Nombre de Departamento - Varchar
    public function getNombre()
    {
        return $this->nombre_departamento;
    }

    //Estado - Boolean
    public function getEstado()
    {
        return $this->estado;
    }
    
    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(id_departamento, departamento)
    public function searchRows($value)
    {
        $sql = 'SELECT id_departamento, departamento
        FROM public.departamento
        WHERE departamento ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_departamento, departamento
        FROM public.departamento';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(nombre_departamento, id_departamento)
    public function createRow(){
        $sql = 'INSERT INTO public.departamento(
        departamento, estado)
        VALUES (?, ?)';
        $params = array($this->nombre_departamento, $this->true);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_departamento, estado, id_departamento)
    public function updateRow(){
        $sql = 'UPDATE public.departamento
        SET departamento=?, estado=?
        WHERE id_departamento=?';
        $params = array($this->nombre_departamento, $this->true, $this->id_departamento);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la eliminación DELETE
    //(nombre_departamento, id_departamento)
    public function deleteRow(){
        $sql = 'UPDATE public.departamento
        SET estado=?
        WHERE id_departamento=?';
        $params = array($this->false, $this->id_departamento);
        return Database::executeRow($sql,$params);
    }
}
