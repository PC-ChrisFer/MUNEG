<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class imagen_reporte extends validator
{
    //Declaración de atributos (propiedades)
    private $id_imagen_reporte = null;
    private $imagen = null;
    private $reporte_id = null;

    //Variables true -- false
    private $true = true;
    private $false = '0';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_imagen_reporte = $value;
            return true;
        } else {
            return false;
        }
    }

    //Imagen representativa de la categoria
    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setReporte($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->reporte_id = $value;
            return true;
        } else {
            return false;
        }
    }

    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_imagen_reporte;
    }

    //Nombre de Usuario - Varchar
    public function getReporte()
    {
        return $this->reporte_id;
    }

    //Obteniendo la ruta de las imagenes
    public function getRutaImagenes()
    {
        return '../imagenes/reporte/';
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAll()
    {
        $sql = 'SELECT id_imagen_reporte, id_reporte, imagen
        FROM public.imagen_reporte';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la insercción INSERT (propietario)
    //(nombre_usuario, password, tipo_usuario, propietario)
    public function createRow()
    {
        $sql = 'INSERT INTO public.imagen_reporte(
            id_reporte, imagen)
            VALUES (?, ?)';
        $params = array($this->reporte_id, $this->imagen);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function updateRow()
    {
        $sql = 'UPDATE public.imagen_reporte
        SET id_reporte=?, imagen=?
        WHERE id_imagen_reporte=?';
        $params = array($this->reporte_id, $this->imagen, $this->id_imagen_reporte);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_propietario)
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.imagen_reporte
        WHERE id_imagen_reporte=?';
        $params = array($this->id_imagen_reporte);
        return Database::executeRow($sql, $params);
    }
}
