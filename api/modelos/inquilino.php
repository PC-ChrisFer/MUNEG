<?php
//Maneja la tabla de empleados  de la base de datos
//Contiene validaciones de validator

class inquilino extends validator
{

    //Declaración de atributos (propiedades)
    private $id_inquilino = null;
    private $nombre = null;
    private $apellido = null;
    private $numero_telefono = null;
    private $correo_electronico = null;
    private $genero = null;
    private $fecha_nacimiento = null;
    private $dui = null;
    private $nrc = null;
    private $nit = null;
    private $imagen = null;
    private $id_tipo_inquilino = null;
    private $id_estado_inquilino = null;


    private $true = true;
    private $still_true = 2;
    private $false = 0;
    //Metodos para setear los valores de los campos
    //Id - integer
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_inquilino = $value;
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
        if ($this->validateDUI($value)) {
        $this->dui = $value;
        return true;
        } else {
            return false;
        }
    }


    //DUI del empleado - char
    public function setNRC($value)
    {
        // if ($this->validateDUI($value)) {
        $this->nrc = $value;
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
    public function setFechaNacimiento($value)
    {
        if ($this->validateDate($value)) {
            $this->fecha_nacimiento = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado del empleado - integer
    public function setEstadoInquilino($value)
    {

        if ($this->validateNaturalNumber($value)) {
            $this->id_estado_inquilino = $value;
            return true;
        } else {
            return false;
        }
    }

    //Estado del empleado - integer
    public function setTipoInquilino($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_inquilino = $value;
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
    public function getRutaImagenes()
    {
        return '../imagenes/inquilino/';
    }

    //Id 
    public function getId()
    {
        return $this->id_inquilino;
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

     //NRC
     public function getNRC()
     {
         return $this->nrc;
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
    public function getEstadoIquilino()
    {
        return $this->id_estado_inquilino;
    }

    //Tipo del empleado   
    public function getTipoInquilino()
    {
        return $this->id_tipo_inquilino;
    }



    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda
    //Utilizaremos los campos o (NOMBRE, APELLIDO, TIPO, ESTADO, TELEFONO, DUI, NIT)
    public function searchRows($value)
    {
        $sql = 'SELECT id_inquilino, nombre, apellido, "DUI","NRC",  "NIT", numero_telefono, correo_electronico, genero, fecha_nacimiento, imagen, estado_inquilino.id_estado_inquilino, nombre_estado , nombre_tipo
        FROM public.inquilino 
        INNER JOIN public.tipo_inquilino
        ON inquilino.id_tipo_inquilino = tipo_inquilino.id_tipo_inquilino
        INNER JOIN public.estado_inquilino
        ON inquilino.id_estado_inquilino = estado_inquilino.id_estado_inquilino
        WHERE nombre ILIKE ? OR apellido ILIKE ? OR "DUI" ILIKE ? OR "NIT" ILIKE ? OR numero_telefono ILIKE ? OR correo_electronico ILIKE ? OR nombre_estado ILIKE ? OR nombre_tipo ILIKE ?
        ORDER BY apellido ';
        $params = array("%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción
    public function createRow()
    {
        $sql = 'INSERT INTO public.inquilino(
            nombre, apellido, numero_telefono, correo_electronico, fecha_nacimiento, genero, "DUI", "NRC", "NIT", id_tipo_inquilino, id_estado_inquilino, imagen, visibilidad)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido,$this->numero_telefono,$this->correo_electronico,  $this->fecha_nacimiento,  $this->genero, $this->dui, $this->nrc, $this->nit,  $this->id_estado_inquilino, $this->id_tipo_inquilino, $this->imagen, $this->true);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización
    public function updateRow()
    {
        $sql = 'UPDATE public.inquilino
        SET nombre=?, apellido=?, numero_telefono=?, correo_electronico=?, fecha_nacimiento=?, genero=?, "DUI"=?, "NRC"=?, "NIT"=?, id_tipo_inquilino=?, id_estado_inquilino=? ,imagen=?
        WHERE id_inquilino=?';
        $params = array($this->nombre, $this->apellido,$this->numero_telefono,$this->correo_electronico,$this->fecha_nacimiento,$this->genero,  $this->dui,$this->nrc, $this->nit, $this->id_tipo_inquilino,   $this->id_estado_inquilino,$this->imagen, $this->id_inquilino);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la eliminación
    public function deleteRow()
    {
        $sql = 'UPDATE public.inquilino
        SET visibilidad=?
        WHERE id_inquilino=?';
        $params = array($this->false, $this->id_inquilino);
        return Database::executeRow($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_inquilino, nombre, apellido, "DUI", "NRC","NIT", numero_telefono, correo_electronico, genero, fecha_nacimiento, imagen, inquilino.id_estado_inquilino, nombre_estado, inquilino.id_estado_inquilino, inquilino.id_tipo_inquilino, nombre_tipo
        FROM public.inquilino
        INNER JOIN public.tipo_inquilino 
        ON tipo_inquilino.id_tipo_inquilino = inquilino.id_tipo_inquilino
        INNER JOIN public.estado_inquilino
        ON estado_inquilino.id_estado_inquilino = inquilino.id_estado_inquilino
        WHERE inquilino.visibilidad = true';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Leer solamente una fila de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_inquilino, nombre, apellido, "DUI", "NRC", "NIT", telefono, correo, genero, fecha_nacimiento, imagen, inquilino.id_estado_inquilino, nombre_estado, inquilino.id_tipo_inquilino, nombre_tipo
        FROM public.inquilino
        INNER JOIN public.tipo_inquilino 
        ON tipo_inquilino.id_tipo_inquilino = inquilino.id_tipo_inquilino
        INNER JOIN public.estado_inquilino
        ON estado_inquilino.id_estado_inquilino = inquilino.id_estado_inquilino 
        WHERE id_inquilino = ?';
        $params = ($this->id_inquilino);
        return Database::getRow($sql, $params);
    }

    //Llenar combobox
    //Combobox de estado empleado
    public function readEstadoInquilino()
    {
        $sql = 'SELECT  id_estado_inquilino, nombre_estado
        FROM estado_inquilino';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox de estado empleado
    public function readTipoInquilino()
    {
        $sql = 'SELECT  id_tipo_inquilino, nombre_tipo
        FROM tipo_inquilino';
        $params = null;
        return Database::getRows($sql, $params);
    }
}