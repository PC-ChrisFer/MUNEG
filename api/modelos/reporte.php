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
    private $imagen = null;

    
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
        // FIX
        // ARREGLAR VALIDACION
        $this->asunto = $value;
        return true;
    }

    //Descripcion - varchar
    public function setDescripcion($value)
    {
        // FIX
        // ARREGLAR VALIDACION
        $this->descripcion = $value;
        return true;
    }

    public function getRutaImagenes() {
        return '../imagenes/reporte/';
    }

    public function getImagen()
    {
        return $this->imagen;
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

    //Imagen del empleado - varying char
    public function setImage($file)
    {
        if ($this->validateImageFile($file, 50000, 50000)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setNoUpdatedImage($image) {
        $this->imagen = $image;
        return true;
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
        WHERE asunto ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_reporte, asunto, descripcion, estado,reporte.id_inquilino, nombre, reporte.imagen
        FROM public.reporte
        INNER JOIN public.inquilino
        ON inquilino.id_inquilino = reporte.id_inquilino AND estado = true';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAllDeleted()
    {
        $sql = 'SELECT id_reporte, asunto, descripcion, estado,reporte.id_inquilino, nombre, reporte.imagen
        FROM public.reporte
        INNER JOIN public.inquilino
        ON inquilino.id_inquilino = reporte.id_inquilino AND estado = false';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT (propietario)
    //(nombre_usuario, password, tipo_usuario, propietario)
    public function createRow()
    {
        $sql = 'INSERT INTO public.reporte(
            asunto, descripcion, id_inquilino, imagen,estado)
            VALUES (?, ?, ?, ?, ?)';
        $params = array($this->asunto, $this->descripcion, $this->inquilino_id, $this->imagen ,$this->true);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function updateRow()
    {
        $sql = 'UPDATE public.reporte
        SET asunto=?, descripcion=?, id_inquilino=?, estado=?, imagen=?
        WHERE id_reporte=?';
        $params = array($this->asunto, $this->descripcion, $this->inquilino_id, $this->estado, $this->imagen, $this->id_reporte);
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
