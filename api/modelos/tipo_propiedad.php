<?php
//Maneja la tabla de tipo propiedad  de la base de datos
//Contiene validaciones de validator

class tipo_propiedad extends validator
{
    //Declaración de atributos (propiedades)
    private $id_tipo_propiedad = null;
    private $tipo_propiedad = null;
    private $categoria_id = null;
    private $visibilidad = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_propiedad = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Tipo de Acabados - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->tipo_propiedad = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para setear los valores de los campos
    //Categoria - integer
    public function setCategoria($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->categoria_id = $value;
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
        return $this->id_tipo_propiedad;
    }

    //Nombre de Tipo de Acabados - Varchar
    public function getNombre()
    {
        return $this->tipo_propiedad;
    }


    //Categoria - Integer
    public function getCategoria()
    {
        return $this->categoria_id;
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
        $sql = 'SELECT id_tipo_propiedad, categoria.id_categoria, nombre_categoria, nombre_tipo, tipo_propiedad.visibilidad
        FROM public.tipo_propiedad
        INNER JOIN public.categoria
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        WHERE nombre_tipo ILIKE ? OR categoria ILIKE ?';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_tipo_propiedad, tipo_propiedad.id_categoria, nombre_categoria, nombre_tipo, tipo_propiedad.visibilidad
        FROM public.tipo_propiedad
        INNER JOIN public.categoria
        ON tipo_propiedad.id_categoria = categoria.id_categoria AND categoria.visibilidad = true AND tipo_propiedad.visibilidad = true';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readAllDeleted()
    {
        $sql = 'SELECT id_tipo_propiedad, tipo_propiedad.id_categoria, nombre_categoria, nombre_tipo, tipo_propiedad.visibilidad
        FROM public.tipo_propiedad
        INNER JOIN public.categoria
        ON tipo_propiedad.id_categoria = categoria.id_categoria AND categoria.visibilidad = true AND tipo_propiedad.visibilidad = false';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT
    //(tipo_propiedad, visibilidad)
    public function createRow()
    {
        $sql = 'INSERT INTO public.tipo_propiedad(
        nombre_tipo, id_categoria, visibilidad)
        VALUES (?, ?, ?)';
        $params = array($this->tipo_propiedad, $this->categoria_id ,$this->visibilidad);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    //(tipo_propiedad, visibilidad, id_tipo_propiedad)
    public function updateRow()
    {
        $sql = 'UPDATE public.tipo_propiedad
        SET nombre_tipo=? ,visibilidad=?, id_categoria=?
        WHERE id_tipo_propiedad=?';
        $params = array($this->tipo_propiedad, $this->visibilidad, $this->categoria_id , $this->id_tipo_propiedad);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_propiedad)
    public function deleteRow()
    {
        $sql = 'UPDATE public.tipo_propiedad
        SET visibilidad=?
        WHERE id_tipo_propiedad =?';
        $params = array($this->false, $this->id_tipo_propiedad);
        return Database::executeRow($sql, $params);
    }
}
