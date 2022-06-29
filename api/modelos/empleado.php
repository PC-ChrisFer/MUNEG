<?php
//Maneja la tabla de empleados  de la base de datos
//Contiene validaciones de validator

class empleado extends validator
{

    //Declaración de atributos (propiedades)
    private $id_empleado = null;
    private $nombre = null;
    private $apellido = null;
    private $numero_telefono = null;
    private $correo_electronico = null;
    private $genero = null;
    private $fecha_nacimiento = null;
    private $dui = null;
    private $nit = null;
    private $imagen = null;
    private $id_tipo_empleado = null;
    private $id_estado_empleado = null;
    

    private $true = 1;
    private $still_true = 2;
    private $false =3;
    //Metodos para setear los valores de los campos
    //Id - integer
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre del empleado - varying char
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    //Apellido del empleado  - varying char
    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellido = $value;
            return true;
        } else {
            return false;
        }
    }

    //DUI del empleado - char
    public function setDUI($value)
    {
            // if ($this->validateDUI($value)) {
            $this->dui = $value;
            return true;
        // } else {
        //     return false;
        // }
    }

    //NIT del empleado - char
    public function setNIT($value)
    {
        // if ($this->validateNIT($value)) {
            $this->nit = $value;
            return true;
        // } else {
        //     return false;
        // }
    }

    //Telefono del empleado - char
    public function setTelefono($value)
    {
        // if ($this->validatePhone($value)) {
            $this->numero_telefono = $value;
            return true;
    //     } else {
    //         return false;
    //     }
     }

    //Correo del empleado - varying char
    public function setCorreo($value)
    {
        // if ($this->validateAlphanumeric($value, 1, 75)) {
            $this->correo_electronico = $value;
            return true;
        // } else {
        //     return false;
        // }
    }

    //Genero del empleado - char
    public function setGenero($value)
    {
        // if ($this->validateAlphabetic($value, 1, 1)) {
            $this->genero = $value;
            return true;
        // } else {
        //     return false;
        // }
    }

    
    //Imagen del empleado - varying char
    public function setImage($file)
    {
        if ($this->validateImageFile($file, 5000, 5000)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }


    //Fecha nacimiento del empleado - Date
    public function setFechaNacmiento($value)
    {
        if ($this->validateDate($value)) {
            $this->fecha_nacimiento = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado del empleado - integer
    public function setEstadoEmpleado($value)
    {

        if ($this->validateNaturalNumber($value)) {
            $this->id_estado_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado del empleado - integer
    public function setTipoEmpleado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_empleado = $value;
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


    //Metodos para obtener los valores de los campos

    //ruta img
    public function getRutaImagenes() {
        return '../imagenes/empleado/';
    }

    //Id 
    public function getId()
    {
        return $this->id_empleado;
    }

    //Nombre del empleado
    public function getNombre()
    {
        return $this->nombre;
    }

    //Apellido del empleado
    public function getApellido()
    {
        return $this->apellido;
    }

    //DUI
    public function getDUI()
    {
        return $this->dui;
    }

    //NIT
    public function getNIT()
    {
        return $this->nit;
    }

    //Telefono
    public function getTelefono()
    {
        return $this->numero_telefono;
    }

    //Correo electronico
    public function getCorreo()
    {
        return $this->correo_electronico;
    }

    //Genero del empleado
    public function getGenero()
    {
        return $this->genero;
    }

    //Fecha Nacimiento
    public function getFechaNacimeinto()
    {
        return $this->fecha_nacimiento;
    }

    //Genero del empleado
    public function getImagen()
    {
        return $this->imagen;
    }

    //Genero del empleado
    public function getEstadoEmpleado()
    {
        return $this->id_estado_empleado;
    }

    //Tipo del empleado   
    public function getTipoEmpleado()
    {
        return $this->id_tipo_empleado;
    }



    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda
    //Utilizaremos los campos o (NOMBRE, APELLIDO, TIPO, ESTADO, TELEFONO, DUI, NIT)
    public function searchRows($value)
    {
        $sql = 'SELECT id_empleado, nombre, apellido, "DUI", "NIT", telefono, correo, genero, fecha_nacimiento, imagen, estado_empleado.id_estado_empleado, nombre_estado , nombre_tipo
        FROM empleado 
        INNER JOIN tipo_empleado
        ON empleado.id_tipo_empleado = tipo_empleado.id_tipo_empleado
        INNER JOIN estado_empleado
        ON empleado.id_estado_empleado = estado_empleado.id_estado_empleado
        WHERE nombre ILIKE ? OR apellido ILIKE ? OR "DUI" ILIKE ? OR "NIT" ILIKE ? OR telefono ILIKE ? OR correo ILIKE ? OR nombre_estado ILIKE ? OR nombre_tipo ILIKE ?
        ORDER BY apellido ';
        $params = array("%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción
    public function createRow()
    {   
        $sql = 'INSERT INTO public.empleado(
            nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", "NIT", imagen, id_tipo_empleado, id_estado_empleado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->numero_telefono, $this->correo_electronico,  $this->fecha_nacimiento, $this->genero, $this->dui, $this->nit, $this->imagen, $this->id_tipo_empleado, $this->id_estado_empleado);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización
    public function updateRow()
    {
        $sql = 'UPDATE public.empleado
        SET id_empleado=?, nombre=?, apellido=?, numero_telefono=?, correo_electronico=?, fecha_nacimiento=?, genero=?, "DUI"=?, "NIT"=?, imagen=?, id_tipo_empleado=?, id_estado_empleado=?
        WHERE id_empleado=?';
        $params = array($this->nombre_empleado, $this->apellido_empleado, $this->dui, $this->nit, $this->telefono, $this->correo, $this->genero, $this->fecha_nacimiento, $this->estado_empleado, $this->tipo_empleado,$this->imagen, $this->id_empleado);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la eliminación
    public function deleteRow()
    {
        $sql = 'DELETE FROM public.empleado
        WHERE id_empleado';
        $params = array($this->id_empleado);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_empleado, nombre, apellido, "DUI", "NIT", numero_telefono, correo_electronico, genero, fecha_nacimiento, imagen, empleado.id_estado_empleado, nombre_estado, empleado.id_estado_empleado, empleado.id_tipo_empleado, nombre_tipo
        FROM empleado
        INNER JOIN tipo_empleado 
        ON tipo_empleado.id_tipo_empleado = empleado.id_tipo_empleado
        INNER JOIN estado_empleado
        ON estado_empleado.id_estado_empleado = empleado.id_estado_empleado
        WHERE empleado.id_estado_empleado = ? OR empleado.id_estado_empleado = ?';
        $params = array($this->true, $this->still_true);
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_empleado, nombre, apellido, "DUI", "NIT", telefono, correo, genero, fecha_nacimiento, imagen, empleado.id_estado_empleado, nombre_estado, empleado.id_tipo_empleado, nombre_tipo
        FROM empleado
        INNER JOIN tipo_empleado 
        ON tipo_empleado.id_tipo_empleado = empleado.id_tipo_empleado
        INNER JOIN estado_empleado
        ON estado_empleado.id_estado_empleado = empleado.id_estado_empleado
        WHERE id_empleado = ?';
        $params = ($this->id_empleado);
        return Database::getRow($sql, $params);
    }

    //Llenar combobox
    //Combobox de estado empleado
    public function readEstadoEmpleado()
    {
        $sql = 'SELECT  id_estado_empleado, nombre_estado
        FROM estado_empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox de estado empleado
    public function readTipoEmpleado()
    {
        $sql = 'SELECT  id_tipo_empleado, nombre_tipo
        FROM tipo_empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }
}
