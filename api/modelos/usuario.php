<?php
//Maneja la tabla de categoria  de la base de datos
//Contiene validaciones de validator

class usuario extends validator
{
    //Declaración de atributos (propiedades)
    private $id_usuario = null;
    private $nombre_usuario = null;
    private $password = null;
    private $tipo_usuario_id = null;
    private $propietario_id = null;
    private $empleado_id = null;

    //Variables true -- false
    private $tipo_administrador = 1;
    private $true = true;
    private $false = '0';
    private $usuario_bloquear = 'fatimachurch';
    private $fecha_actual = '01-09-2022';

    //Metodos para setear los valores de los campos
    //Id - serial
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    //Nombre de Usuario - Varchar
    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_usuario = $value;
            return true;
        } else {
            return false;
        }
    }
    // punto 2 fernando
    //Password - varchar
    public function setPassword($value)
    {
        if ($this->validatePassword($value)) {
            $this->password = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else { 
            return false;
        }
    }
    //Id Tipo de Usuario - Integer
    public function setTipoUsuario($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->tipo_usuario_id = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id Propietario - Integer
    public function setPropietario($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->propietario_id = $value;
            return true;
        } else {
            return false;
        }
    }

    //Id Empleado - Integer
    public function setEmpleado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->empleado_id = $value;
            return true;
        } else {
            return false;
        }
    }
    //Metodos para obtener los valores de los campos

    //Id - Serial
    public function getId()
    {
        return $this->id_usuario;
    }

    //Nombre de Usuario - Varchar
    public function getNombre()
    {
        return $this->nombre_usuario;
    }

    //Password - Varchar
    public function getPassword()
    {
        return $this->password;
    }

    //Tipo Usuario - Integer
    public function getTipoUsuario()
    {
        return $this->tipo_usuario_id;
    }

    //Propietario - Integer
    public function getPropietario()
    {
        return $this->propietario_id;
    }
    //Empleado - Integer
    public function getEmpleado()
    {
        return $this->empleado_id;
    }

    //Metodos para realizar las operaciones SCRUD(Search, Create, Read, Update, Delete)

    //Metodo para la busqueda SEARCH
    //(nombre_tipo, nombre_usuario, nombre_propietario)
    public function searchRowsPropietario($value)
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password, usuario.id_tipo_usuario, nombre_tipo, usuario.id_propietario, nombre
	    FROM public.usuario
	    INNER JOIN public.propietario
	    ON propietario.id_propietario = usuario.id_propietario
	    INNER JOIN public.tipo_usuario
	    ON tipo_usuario.id_tipo_usuario = usuario.id_tipo_usuario
        WHERE nombre_tipo ILIKE ? OR nombre_usuario ILIKE ? OR nombre ILIKE ?';
        $params = array("%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda SEARCH
    //(nombre_tipo, nombre_usuario, nombre_empleado)
    public function searchRowsEmpleado($value)
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password, usuario.id_tipo_usuario, nombre_tipo, usuario.id_empleado, nombre
	    FROM public.usuario
        INNER JOIN public.empleado 
        ON empleado.id_empleado = usuario.id_empleado
	    INNER JOIN public.tipo_usuario
	    ON tipo_usuario.id_tipo_usuario = usuario.id_tipo_usuario
        WHERE nombre_tipo ILIKE ? OR nombre_usuario ILIKE ? OR nombre ILIKE ?';
        $params = array("%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAllPropietario()
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password, usuario.id_tipo_usuario, nombre_tipo, usuario.id_propietario, nombre  
        FROM public.usuario
	    INNER JOIN public.propietario
	    ON propietario.id_propietario = usuario.id_propietario
	    INNER JOIN public.tipo_usuario
	    ON tipo_usuario.id_tipo_usuario = usuario.id_tipo_usuario';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para la busqueda READALL
    //(sin parametros)
    public function readAllEmpleado()
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password, usuario.id_tipo_usuario
        FROM usuario
        INNER JOIN tipo_usuario
        ON tipo_usuario.id_tipo_usuario = usuario.id_tipo_usuario';
        $params = null;
        return Database::getRows($sql, $params);
    }



    //Metodo para la inserción de Adminitrador
    public function createRow()
    {
        $sql = 'INSERT INTO usuario(
            nombre_usuario, password, id_tipo_usuario)
            VALUES (?, ?, ?)';
        $params = array($this->nombre_usuario, $this->password, $this->tipo_administrador);
        return Database::executeRow($sql, $params);
    }


    //Metodo para la inserción de Adminitrador
    public function readOne($idUsuario)
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password
        FROM public.usuario   
        WHERE id_usuario = ?';
        $params = array($idUsuario);
        return Database::getRow($sql, $params);
    }

    //Metodo para la insercción INSERT (propietario)
    //(nombre_usuario, password, tipo_usuario, propietario)
    public function createRowPropietario()
    {
        $sql = 'INSERT INTO public.usuario(
            nombre_usuario, password, id_tipo_usuario, id_propietario)
            VALUES (?, ?, ?, ?)';
        $params = array($this->nombre_usuario, $this->password, $this->tipo_usuario_id, $this->propietario_id);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la insercción INSERT (empleado)
    //(nombre_usuario, password, tipo_usuario, empleado)
    public function createRowEmpleado()
    {
        $sql = 'INSERT INTO public.usuario(
            nombre_usuario, password, id_tipo_usuario, id_propietario)
            VALUES (?, ?, ?, ?)';
        $params = array($this->nombre_usuario, $this->password, $this->tipo_usuario_id, $this->propietario_id);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function updateRowPropietario()
    {
        $sql = 'UPDATE public.usuario
        SET nombre_usuario=?, password=?, id_tipo_usuario=?, id_propietario=?
        WHERE id_usuario=?';
        $params = array($this->nombre_usuario, $this->password, $this->tipo_usuario_id, $this->propietario_id, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function updateRowEmpleado()
    {
        $sql = 'UPDATE public.usuario
        SET nombre_usuario=?, id_tipo_usuario=?, id_empleado=?
        WHERE id_usuario=?';
        $params = array($this->nombre_usuario,  $this->tipo_usuario_id, $this->empleado_id, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function editUser()
    {
        $sql = 'UPDATE public.usuario
        SET nombre_usuario=?, password=?, fecha_cambio_contra=?
        WHERE id_usuario=?';
        $params = array($this->nombre_usuario, $this->password, $this->fecha_actual, $this->id_usuario);
        if (Database::executeRow($sql, $params)) {
            $sql2 = 'INSERT INTO public.usuario_password(
            id_usuario, password)
            VALUES (?, ?)';
            $params2 = array($this->id_usuario, $this->password);
            return Database::executeRow($sql2, $params2);
        } else {
            return false;
        }
    }

    //Metodo para la actualización UPDATE
    //(nombre_usuario, password, tipo_usuario, propietario, usuario)
    public function editPassword()
    {
        $sql = 'UPDATE public.usuario
        SET password= ?
        WHERE id_usuario= ?';
        $params = array($this->password, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    //Metodo para la eliminación DELETE
    //(visibilidad, id_tipo_propietario)
    public function deleteRow()
    {
        $sql = 'UPDATE public.usuario
        SET id_tipo_usuario=?
        WHERE id_usuario=?';
        $params = array(4, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    //Buscar el nombre del usuario
    public function searchUser($nombre_Usuario)
    {
        $sql = 'SELECT id_usuario, nombre_usuario, password, id_tipo_usuario, correo_electronico
        FROM public.usuario
        INNER JOIN public.empleado
        ON empleado.id_empleado = usuario.id_empleado
        WHERE nombre_usuario = ? AND id_tipo_usuario != 4';
        $param = array($nombre_Usuario);
        if ($data = Database::getRow($sql, $param)) {
            $this->id_usuario = $data['id_usuario'];
            $this->nombre_usuario = $nombre_Usuario;
            return true;
        } else {
            return false;
        }
    }

    //Buscar el password
    public function searchPassword($insertedPassword)
    {
        $sql = 'SELECT password 
         FROM usuario 
         WHERE id_usuario = ? AND id_tipo_usuario != 4';
        $param = array($this->id_usuario);
        if ($data = Database::getRow($sql, $param)) {
            if (password_verify($insertedPassword, $data['password'])) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        } 
    }
    //Bloquear usuario
    public function blockUser()
    {
        $sql = 'UPDATE public.usuario 
        SET id_tipo_usuario = 4
        WHERE nombre_usuario = ?';
        $params = array($this->nombre_usuario);
        return Database::executeRow($sql, $params);
    }

    //Buscar el correo segun la contraseña
    public function readCorreo()
    {
        $sql = 'SELECT empleado.id_empleado, correo_electronico, usuario.id_usuario
        FROM public.usuario
        INNER JOIN empleado
        ON usuario.id_empleado = empleado.id_empleado
        WHERE nombre_usuario = ?';
        $params = array($this->nombre_usuario);
        return Database::getRow($sql, $params);
    }


    //Buscar la fecha de cambio de contra
    public function readFechaCambio()
    {
        $sql = 'SELECT fecha_cambio_contra 
        FROM usuario 
        WHERE id_usuario = ?;';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    //Comparar las anteriores contraseñas
    public function comparePassword($password)
    {
        $sql = 'SELECT password 
        FROM public.usuario_password 
        WHERE id_usuario = ? 
        ORDER BY id_password DESC LIMIT 6';
        $params = array($this->id_usuario);
        //La información de las respuestas se guarda en esta variable como en un arreglo
        $data = Database::getRows($sql, $params);
        //Se crear una variable, estado, para determinar si la password puede ser utilizada o no segun si coincide con los datos encontrados
        //El estado por defecto es falso por que el primer valor en los registros es la contraseña que acaba de escribir
        $estado = false;
        //Se crea un foreach para hacer una comparación entre la password recibida y un registro de las tablas traidas
        foreach ($data as $value) {
            //Se "desencripta" la contraseña y realiza la comparación
            if (password_verify($password, $value['password'])) {
                //Si coinciden se determina como true la coincidencia y se restringe la continuacion del proceso
                $estado = true;
            }
        }
        //Se retorna el estado al final
        return $estado;
    }
}
