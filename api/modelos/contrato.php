<?php
//Maneja la tabla de contrato  de la base de datos
//Contiene validaciones de validator

class contrato extends validator
{
    //Declaración de atributos (propiedades)
    private $id_contrato = null;
    private $descripcion = null;
    private $fecha_firma = null;
    private $imagen = null;
    private $id_propietario = null;
    private $id_propiedad = null;
    private $id_empleado = null;
    private $id_inquilino = null;
    private $ruta;

    //Metodos para setear los valores de los campos
    //Id
    public function setId($value)
    {
        $this->id_contrato = $value;
        return true;
    }
    //Descripción
    public function setDescripcion($value)
    {
        $this->descripcion = $value;
        return true;
    }
    
    //Fecha firma
    public function setFechaFirma($value)
    {
        $this->fecha_firma = $value;
        return true;
    }

    //Imagen
    public function setImagen($value)
    {
        $this->imagen = $value;
        return true;
    }

    //IdPropietario
    public function setIdPropietario($value)
    {
        $this->id_propietario = $value;
        return true;
    }

    //IdPropiedad
    public function setIdPropiedad($value)
    {
        $this->id_propiedad = $value;
        return true;
    }

    //IdEmpleado
    public function setIdEmpleado($value)
    {
        $this->id_empleado = $value;
        return true;
    }

    //IdInquilino
    public function setIdInquilino($value)
    {
        $this->id_inquilino = $value;
        return true;
    }

    //Métodos para obtener los valores de los cambios

    //IdContrato
    public function getId($value)
    {
        return $this->id_contrato;
        
    }

    //Descripción
    public function getDescripcion($value)
    {
        return $this->descripcion;
        
    }

    //Fecha firma
    public function getFechaFirma($value)
    {
        return $this->fecha_firma;
        
    }

    //Imagen
    public function getImagen($value)
    {
        return $this->imagen;
        
    }

    //IdPropietario
    public function getIdPropietario($value)
    {
        return $this->id_propietario;
        
    }

    //IdPropiedad
    public function getIdPropiedad($value)
    {
        return $this->id_propiedad;
        
    }

    //IdEmpleado
    public function getIdEmpleado($value)
    {
        return $this->id_empleado;
        
    }

    //IdInquilino
    public function getIdInquilino($value)
    {
        return $this->id_inquilino;
        
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_contrato, descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino
        FROM contrato
        WHERE descripcion ILIKE ? ';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO contrato(
            descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino)
            VALUES (?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->descripcion, $this->fecha_firma, $this->imagen, $this->id_propietario, $this->id_propiedad, $this->id_empledo, $this->id_inquilino);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE contrato
        SET  descripcion = ?, fecha_firma = ?, imagen = ?, id_propietario = ?, id_propiedad = ?, id_empleado = ?, id_inquilino = ?
        WHERE id_contrato =?';
        $params = array($this->descripcion, $this->fecha_firma, $this->imagen, $this->id_propietario, $this->id_propiedad, $this->id_empledo, $this->id_inquilino, $this->id_contrato);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'DELETE FROM contrato
        WHERE id_contrato = ?';
        $params = array($this->id_contrato);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_contrato, descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino
        FROM contrato';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_contrato, descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino
        FROM contrato
        WHERE id_contrato = ?';
        $params = ($this->id_contrato);
        return Database::getRow($sql, $params);
    }

}