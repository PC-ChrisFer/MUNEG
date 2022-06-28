<?php
//Maneja la tabla de contrato  de la base de datos
//Contiene validaciones de validator

class propietario extends validator
{
    //Declaración de atributos (propiedades)
    private $id_propietario = null;
    private $nombre = null;
    private $apellido = null;
    private $numero_telefono = null;
    private $correo_electronico = null;
    private $fecha_nacimiento = null;
    private $genero = null;
    private $DUI = null;
    private $imagen = null;
    private $id_tipo_propietario = null;
    private $ruta;
    
    //Metodos para setear los valores de los campos
    //Id
    public function setId($value)
    {
        $this->id_propietario = $value;
        return true;
    }

    //Nombre
    public function setNombre($value)
    {
        $this->nombre = $value;
        return true;
    }
    //Apellido
    public function setApellido($value)
    {
        $this->apellido = $value;
        return true;
    }
    //Numero de Telefono
    public function setTelefono($value)
    {
        $this->numero_telefono = $value;
        return true;
    }
    //Correo Electrónico
    public function setCorreo($value)
    {
        $this->correo_electronico = $value;
        return true;
    }
    //Fecha Nacimiento
    public function setFechaNacimiento($value)
    {
        $this->fecha_nacimiento = $value;
        return true;
    }
    //Género
    public function setGenero($value)
    {
        $this->genero = $value;
        return true;
    }
    //DUI
    public function setDUI($value)
    {
        $this->DUI = $value;
        return true;
    }
    //imagen
    public function setImagen($value)
    {
        $this->imagen = $value;
        return true;
    }
    //Id Tipo Propietario
    public function setIdTipoPropietario($value)
    {
        $this->id_tipo_propietario = $value;
        return true;
    }

    //Métodos para obtener los valores de los cambios

    //Id Propietario
    public function getId($value)
    {
        return $this->id_propietario;
        
    }
    //Nombre
    public function getNombre($value)
    {
        return $this->nombre;
        
    }
    //Apellido
    public function getApellido($value)
    {
        return $this->apellido;
        
    }
    //Numero Telefono
    public function getTelefono($value)
    {
        return $this->numero_telefono;
        
    }
    //Correo Electronico
    public function getCorreo($value)
    {
        return $this->correo_electronico;
        
    }
    //Fecha Nacimiento
    public function getFechaNacimiento($value)
    {
        return $this->fecha_nacimiento;
        
    }
    //Genero
    public function getGenero($value)
    {
        return $this->genero;
        
    }
    //DUI
    public function getDUI($value)
    {
        return $this->DUI;
        
    }
    //imagen
    public function getImagen($value)
    {
        return $this->imagen;
        
    }
    //Id tipo propietario
    public function getIdTipoPropietario($value)
    {
        return $this->id_tipo_propietario;
        
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", imagen, id_tipo_propietario
        FROM public.propietario;
        WHERE nombre = ? ';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO public.propietario(
            nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", imagen, id_tipo_propietario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        $params = array($this->nombre, $this->apellido, $this->numero_telefono, $this->correo_electronico, $this->fecha_nacimiento, $this->genero, $this->DUI, $this->imagen, $this->id_tipo_propietario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE public.propietario
        SET nombre=?, apellido=?, numero_telefono=?, correo_electronico=?, fecha_nacimiento=?, genero=?, "DUI"=?, imagen=?, id_tipo_propietario=?
        WHERE id_propietario = ?';
        $params = array($this->nombre, $this->apellido, $this->numero_telefono, $this->correo_electronico, $this->fecha_nacimiento, $this->genero, $this->DUI, $this->imagen, $this->id_tipo_propietario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.propietario
	WHERE id_propietario';
        $params = array($this->id_propietario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", imagen, id_tipo_propietario
        FROM public.propietario';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_propietario, nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", imagen, id_tipo_propietario
        FROM public.propietario
        WHERE id_propietario = ?';
        $params = ($this->id_propietario);
        return Database::getRow($sql, $params);
    }

    

}