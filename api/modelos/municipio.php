<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class municipio extends validator
{
    //Declaración de atributos (propiedades)
    private $id_municipio = null;
    private $nombre_municipio = null;
    private $departamento_id = null;
    private $estado = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_municipio = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Municipio - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 40)) {
            $this->nombre_municipio = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id_departamento - Integer
    public function setDepartamento($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->departamento_id = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado - Boolean
    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->departamento_id = $value;
            return true;
        } else {
            return false;
        }
    }


    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_municipio;
    }

    //Nombre de Municipio - Varchar
    public function getNombre()
    {
        return $this->nombre_municipio;
    }

    //Id de Departamento - Integer
    public function getDepartamento()
    {
        return $this->departamento_id;
    }

    //Estado - Boolean
    public function getEstado()
    {
        return $this->estado;
    }
    
    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(municipio, departamento)
    public function searchRows($value)
    {
        $sql = 'SELECT id_municipio, municipio, municipio.id_departamento, departamento
        FROM public.municipio
        INNER JOIN public.departamento
        ON public.municipio.id_departamento = public.departamento.id_departamento
        WHERE departamento ILIKE ? OR municipio ILIKE ?';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_municipio, municipio, municipio.id_departamento, departamento, municipio.estado
        FROM public.municipio
        INNER JOIN public.departamento
        ON public.municipio.id_departamento = public.departamento.id_departamento';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(nombre_municipio, id_departamento)
    public function createRow(){
        $sql = 'INSERT INTO public.municipio(
        municipio, id_departamento, estado)
        VALUES (?, ?, ?)';
        $params = array($this->nombre_municipio, $this->departamento_id, $this->true);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_municipio, id_departamento, estado, id_municipio)
    public function updateRow(){
        $sql = 'UPDATE public.municipio
        SET municipio=?, id_departamento=?, estado=?
        WHERE id_municipio=?';
        $params = array($this->nombre_municipio, $this->departamento_id, $this->true, $this->id_municipio);
        return Database::executeRow($sql,$params);
    }

    //Metodo para la eliminación DELETE
    //(nombre_municipio, id_departamento)
    public function deleteRow(){
        $sql = 'UPDATE public.municipio
        SET estado=?
        WHERE id_municipio=?';
        $params = array($this->false, $this->id_municipio);
        return Database::executeRow($sql,$params);
    }
}
