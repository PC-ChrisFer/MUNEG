<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class tipo_inquilino extends validator
{
    //Declaración de atributos (propiedades)
    private $id_tipo_inquilino = null;
    private $nombre_tipo = null;
    private $visibilidad = null;


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

    //Nombre tipo - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 30)) {
            $this->nombre_tipo = $value;
            return true;
        } else {
            return false;
        }
    }

    //Visivilidad - Boolean
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

    //Nombre tipo - Varchar
    public function getNombre()
    {
        return $this->nombre_tipo;
    }

    //Visibildad - Boolean
    public function getEstado()
    {
        return $this->visibilidad;
    }


    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(POR EL MOMENTO NO MODIFICADO)
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
        $sql = 'SELECT id_tipo_inquilino, nombre_tipo, visibilidad
        FROM public.tipo_inquilino;';
        $params = null;
        return Database::getRows($sql, $params);
    }

    
    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_tipo_usuario, nombre_tipo
        FROM tipo_usuario
        WHERE id_tipo_usuario=?';
        $params = ($this->id_tipo_usuario);
        return Database::getRow($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(nombre_municipio, id_departamento)
    public function createRow()
    {
        $sql = 'INSERT INTO public.tipo_inquilino(
            nombre_tipo, visibilidad)
            VALUES (?, ?);;';

        $params = array($this->nombre_tipo, $this->visibilidad);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_municipio, id_departamento, estado, id_municipio)
    public function updateRow()
    {
        $sql = 'UPDATE public.tipo_usuario
        SET id_tipo_usuario=?, nombre_tipo=?, visibilidad=?
        WHERE id_tipo_usuario=?';
        $params = array($this->nombre_tipo, $this->visibilidad);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE
    //(nombre_municipio, id_departamento)
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.tipo_inquilino
        WHERE id_tipo_inquilino=?';
        $params = array($this->id_tipo_inquilino);
        return Database::executeRow($sql, $params);
    }
}
