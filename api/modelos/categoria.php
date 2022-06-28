<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class categoria extends validator
{
    //Declaración de atributos (propiedades)
    private $id_categoria = null;
    private $nombre_categoria = null;
    private $visibilidad = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id de Categoria
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_categoria = $value;
            return true;
        } else {
            return false;
        }

    }

    //Nombre de Categoria
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_categoria = $value;
            return true;
        } else {
            return false;
        }
        
    }

    //Visibilidad de Categoria
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
    
    //Id de Categoria
    public function getId($value)
    {
        return $this->id_categoria;
        
    }

    //Nombre de Categoria
    public function getNombre($value)
    {
        return $this->nombre_categoria;
        
    }

    //Visibilidad de Categoria
    public function getVisiblidad($value)
    {
        return $this->visibilidad;
        
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_categoria, nombre_categoria, visibilidad 
        FROM categoria 
        WHERE nombre_categoria ILIKE ? ';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }
    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO categoria(
            nombre_categoria, visibilidad)
            VALUES (?, ?)';
        $params = array($this->nombre_categoria, $this->visibilidad);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE categoria
        SET nombre_categoria=?, visibilidad=?
        WHERE id_categoria =?';
        $params = array($this->nombre_categoria, $this->visibilidad, $this->id_categoria);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la eliminación DELETE
    public function deleteRow(){
        $sql = 'UPDATE public.categoria
        SET visibilidad=?
        WHERE id_categoria=?';
        $params = array($this->false, $this->id_categoria);
        return Database::executeRow($sql,$params);
    }
    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, visibilidad
        FROM categoria';
        $params = null;
        return Database::getRows($sql, $params);
    }
    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, visibilidad
        FROM categoria
        WHERE id_categoria = ?';
        $params = ($this->id_categoria);
        return Database::getRow($sql, $params);
    }
}   