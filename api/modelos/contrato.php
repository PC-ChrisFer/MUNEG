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
    private $fecha_firma_final = null;
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

    public function setImageName($fileName) {
        $this->imagen = $fileName;
        return true;
    }
    
    //Fecha firma
    public function setFechaFirma($value)
    {
        $this->fecha_firma = $value;
        return true;
    }

    //Fecha firma
    public function setFechaFirmaFinal($value)
    {
        $this->fecha_firma_final = $value;
        return true;
    }

    //Imagen
    public function setImage($file)
    {
        if ($this->validateImageFile($file, 5000, 5000)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
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

    //ruta img
    public function getRutaImagenes() {
        return '../imagenes/contrato/';
    }

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

    //Fecha firma
    public function getFechaFirmaFinal($value)
    {
        return $this->fecha_firma_final;
        
    }


    //Imagen
    public function getImagen()
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
        FROM public.contrato
        WHERE descripcion ILIKE ? ';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO public.contrato(
            descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino)
            VALUES (?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->descripcion, $this->fecha_firma, $this->imagen, $this->id_propietario, $this->id_propiedad, $this->id_empleado, $this->id_inquilino);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE public.contrato
        SET  descripcion = ?, fecha_firma = ?, imagen = ?, id_propietario = ?, id_propiedad = ?, id_empleado = ?, id_inquilino = ?
        WHERE id_contrato =?';
        $params = array($this->descripcion, $this->fecha_firma, $this->imagen, $this->id_propietario, $this->id_propiedad, $this->id_empleado, $this->id_inquilino, $this->id_contrato);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.contrato
        WHERE id_contrato = ?';
        $params = array($this->id_contrato);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_contrato, descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino
        FROM public.contrato';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_contrato, descripcion, fecha_firma, imagen, id_propietario, id_propiedad, id_empleado, id_inquilino
        FROM public.contrato
        WHERE id_contrato = ?';
        $params = ($this->id_contrato);
        return Database::getRow($sql, $params);
    }

    //Llenar combobox
    //Combobox del Propietario
    public function readPropietario()
    {
        $sql = 'SELECT  id_propietario, nombre
        FROM public.propietario';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox del Propiedad
    public function readPropiedad()
    {
        $sql = 'SELECT  id_propiedad, codigo
        FROM public.propiedad';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox del Propiedad
    public function readEmpleado()
    {
        $sql = 'SELECT  id_empleado, nombre
        FROM public.empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox del Inquilino
    public function readInquilino()
    {
        $sql = 'SELECT  id_inquilino, nombre
        FROM public.inquilino';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Consultas de graficos
    //CONTRATOS GENERADOS POR MES
    public function readContratosxMes()
    {
        $sql = 'SELECT count(id_contrato), EXTRACT(MONTH FROM fecha_firma) FROM contrato 
        GROUP BY EXTRACT(MONTH FROM fecha_firma)
        ORDER BY EXTRACT(MONTH FROM fecha_firma)';
        $params = null;
        return Database::getRows($sql, $params);
    }    

    //La cantidad de firmas realizada por los empleados durante un periodo de tiempo (fecha_firma, fecha_firma)
    public function readFirmasEmpleados()
    {
        $sql = 'SELECT COUNT(empleado.id_empleado), CONCAT(nombre, apellido) FROM empleado
        INNER JOIN contrato 
        ON contrato.id_empleado = empleado.id_empleado 
        WHERE fecha_firma BETWEEN ? AND  ?
        GROUP BY CONCAT(nombre, apellido)';
        $params = array($this->fecha_firma, $this->fecha_firma_final);
        return Database::getRows($sql, $params);
    }  
}