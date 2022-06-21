<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class reporte extends validator
{
    //Declaración de atributos (propiedades)
    private $id_reporte = null;
    private $asunto = null;
    private $descripcion = null;
    private $inquilino_id = null;
    private $estado = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_reporte = $value;
            return true;
        } else {
            return false;
        }
    }

    //Asunto - Varchar
    public function setAsunto($value)
    {
        if ($this->validateAlphabetic($value, 1, 100)) {
            $this->asunto = $value;
            return true;
        } else {
            return false;
        }
    }

    //Descripcion - varchar
    public function setDescripcion($value)
    {
        if ($this->validateAlphabetic($value, 6, 300)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id Inquilino - Integer
    public function setInquilino($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->inquilino_id = $value;
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
        return $this->id_reporte;
    }

    //Nombre de Usuario - Varchar
    public function getAsunto()
    {
        return $this->asunto;
    }

    //Password - Varchar
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    //Tipo Usuario - Integer
    public function getInquilino()
    {
        return $this->inquilino_id;
    }

    //Estado - Boolean
    public function getEstado()
    {
        return $this->estado;
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(nombre_tipo, nombre_usuario, nombre_propietario)
    public function searchRows($value)
    {
        $sql = 'SELECT id_reporte, asunto, descripcion, estado ,reporte.id_inquilino, nombre
        FROM public.reporte
        INNER JOIN public.inquilino
        ON inquilino.id_inquilino = reporte.id_inquilino
        WHERE nombre ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_reporte, asunto, descripcion, estado,reporte.id_inquilino, nombre
        FROM public.reporte
        INNER JOIN public.inquilino
        ON inquilino.id_inquilino = reporte.id_inquilino';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT (propietario)
    //(nombre_usuario, password, tipo_usuario, propietario)
    public function createRow()
    {
        $sql = 'INSERT INTO public.reporte(
            asunto, descripcion, id_inquilino, estado)
            VALUES (?, ?, ?, ?)';
        $params = array($this->asunto, $this->descripcion, $this->inquilino_id, $this->true);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function updateRow()
    {
        $sql = 'UPDATE public.reporte
        SET asunto=?, descripcion=?, id_inquilino=?, estado=?
        WHERE id_reporte=?';
        $params = array($this->asunto, $this->descripcion, $this->inquilino_id, $this->estado, $this->id_reporte);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_propietario)
    public function deleteRow()
    {
        $sql = 'UPDATE public.reporte
        SET estado=?
        WHERE id_reporte=?';
        $params = array($this->false, $this->id_reporte);
        return Database::executeRow($sql, $params);
    }
}
