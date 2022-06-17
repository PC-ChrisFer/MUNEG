<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class propiedad extends validator
{
    //Declaración de atributos (propiedades)
    private $id_propiedad = null;
    private $direccion = null;
    private $area_propiedad = null;
    private $area_contruccion = null;
    private $codigo = null;
    private $precio = null;
    private $alquiler = null;
    private $habitaciones = null;
    private $plantas = null;
    private $sanitario = null;
    private $espacio_parqueo = null;
    private $descripcion = null;
    private $id_municipio = null;
    private $id_tipo_propiedad = null;
    private $id_empleado = null;
    private $id_inquilino = null;
    private $id_tipo_acabado = null;

    //Metodos para setear los valores de los campos
    //Id
    public function setId($value)
    {
        $this->id_propiedad = $value;
        return true;
    }
    //Dirección
    public function setDireccion($value)
    {
        $this->direccion = $value;
        return true;
    }
    //Area de Propiedad 
    public function setAreaPro($value)
    {
        $this->area_propiedad = $value;
        return true;
    }
    //Area de Construccion
    public function setAreaCons($value)
    {
        $this->area_contruccion = $value;
        return true;
    }
    //Código
    public function setCodigo($value)
    {
        $this->codigo = $value;
        return true;
    }
    //Precio
    public function setPrecio($value)
    {
        $this->precio = $value;
        return true;
    }
    //Alquiler
    public function setAlquiler($value)
    {
        $this->alquiler = $value;
        return true;
    }
    //Habitaciones
    public function setHabitaciones($value)
    {
        $this->habitaciones = $value;
        return true;
    }
    //Plantas
    public function setPlantas($value)
    {
        $this->plantas = $value;
        return true;
    }
    //Sanitario
    public function setSanitario($value)
    {
        $this->sanitario = $value;
        return true;
    }
    //Espacio de Parqueo
    public function setEspacio($value)
    {
        $this->espacio_parqueo = $value;
        return true;
    }
    //Descripción
    public function setDescripcion($value)
    {
        $this->id_propiedad = $value;
        return true;
    }
    //Id de Municipio
    public function setIdMunicipio($value)
    {
        $this->id_municipio = $value;
        return true;
    }
    //Id de Tipo Propiedad
    public function setIdTipoPropiedad($value)
    {
        $this->id_tipo_propiedad = $value;
        return true;
    }
    //Id de Empleado
    public function setIdEmpleado($value)
    {
        $this->id_empleado = $value;
        return true;
    }
    //Id de Inquilino
    public function setIdInquilino($value)
    {
        $this->id_propiedad = $value;
        return true;
    }
    //Id Tipo Acabado
    public function setIdTipoAcabado($value)
    {
        $this->id_tipo_acabado = $value;
        return true;
    }

    //Metodos para obtener los valores de los campos
    
    //Id
    public function getId($value)
    {
        return $this->id_propiedad;
        
    }
    //Dirección
    public function getDireccion($value)
    {
        return $this->direccion;
        
    }
    //Area de Propiedad 
    public function getAreaPro($value)
    {
        return $this->area_propiedad;
        
    }
    //Area de Construccion
    public function getAreaCons($value)
    {
        return $this->area_contruccion;
        
    }
    //Código
    public function getCodigo($value)
    {
        return $this->codigo;
        
    }
    //Precio
    public function getPrecio($value)
    {
        return $this->precio;
        
    }
    //Alquiler
    public function getAlquiler($value)
    {
        return $this->alquiler;
        
    }
    //Habitaciones
    public function getHabitaciones($value)
    {
        return $this->habitaciones;
        
    }
    //Plantas
    public function getPlantas($value)
    {
        return $this->plantas;
        
    }
    //Sanitario
    public function getSanitario($value)
    {
        return $this->sanitario;
        
    }
    //Espacio de Parqueo
    public function getEspacio($value)
    {
        return $this->espacio_parqueo;
        
    }
    //Descripción
    public function getDescripcion($value)
    {
        return $this->id_propiedad;
        
    }
    //Id de Municipio
    public function getIdMunicipio($value)
    {
        return $this->id_municipio;
        
    }
    //Id de Tipo Propiedad
    public function getIdTipoPropiedad($value)
    {
        return $this->id_tipo_propiedad;
        
    }
    //Id de Empleado
    public function getIdEmpleado($value)
    {
        return $this->id_empleado;
        
    }
    //Id de Inquilino
    public function getIdInquilino($value)
    {
        return $this->id_propiedad;
        
    }
    //Id Tipo Acabado
    public function getIdTipoAcabado($value)
    {
        return $this->id_tipo_acabado;
        
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado 
        FROM public.propiedad 
        WHERE direccion ILIKE ?';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }
    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO public.propiedad  (direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->direccion, $this->area_propiedad, $this->area_contruccion, $this-> codigo, $this-> precio, $this -> alquiler, $this-> habitaciones, $this-> plantas, $this-> sanitario, $this-> espacio_parqueo, $this-> descripcion, $this-> id_municipio, $this-> it_tipo_propiedad, $this-> id_empleado, $this-> id_inquilino, $this-> id_tipo_acabado);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE public.propiedad  (direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado) 
        SET direccion = ?, area_propiedad = ?, area_contruccion = ?, codigo = ?, precio = ?, alquiler = ?, habitaciones = ?, plantas = ?, sanitario = ?, espacio_parqueo = ?, descripcion = ?, id_municipio = ?, id_tipo_propiedad = ?, id_empleado = ?, id_inquilino = ?,  id_tipo_acabado = ?
        WHERE id_propiedad =?';
        $params = array($this->direccion, $this->area_propiedad, $this->area_contruccion, $this-> codigo, $this-> precio, $this -> alquiler, $this-> habitaciones, $this-> plantas, $this-> sanitario, $this-> espacio_parqueo, $this-> descripcion, $this-> id_municipio, $this-> it_tipo_propiedad, $this-> id_empleado, $this-> id_inquilino, $this-> id_tipo_acabado);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.propiedad 
        WHERE id_propiedad = ?';
        $params = array($this->id_propiedad);
        return Database::executeRow($sql, $params);
    }
    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado 
        FROM public.propiedad ';
        $params = null;
        return Database::getRows($sql, $params);
    }
    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado 
        FROM public.propiedad 
        WHERE id_propiedad = ?';
        $params = ($this->id_propiedad);
        return Database::getRow($sql, $params);
    }
}
