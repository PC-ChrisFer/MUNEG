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
    private $id_departamento = null;
    private $categoria = null;
    private $imagen = null;

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
        $this->descripcion = $value;
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
        $this->id_inquilino = $value;
        return true;
    }
    //Id Tipo Acabado
    public function setIdTipoAcabado($value)
    {
        $this->id_tipo_acabado = $value;
        return true;
    }

    //Id de Departamento
    public function setDepartamento($value)
    {
        $this->id_departamento = $value;
        return true;
    }

    //Id de Categoria
    public function setCategoria($value)
    {
        $this->categoria = $value;
        return true;
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

    //Metodos para obtener los valores de los campos

    public function getRutaImagenes() {
        return '../imagenes/propiedad/';
    }

    public function getImagen()
    {
        return $this->imagen;
    }

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

    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRows($value)
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, 
        espacio_parqueo, descripcion, departamento.id_departamento, departamento, municipio.id_municipio, municipio, categoria.id_categoria, 
        nombre_categoria, propiedad.id_tipo_propiedad, tipo_propiedad.nombre_tipo, propiedad.id_empleado, empleado.nombre, empleado.apellido, 
        empleado.imagen, propiedad.id_inquilino, inquilino.nombre, inquilino.apellido, inquilino.imagen, propiedad.id_tipo_acabado, tipo_acabado.nombre_tipo 
        FROM public.propiedad
        INNER JOIN public.municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN public.departamento 
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN public.tipo_propiedad
        ON propiedad.id_tipo_propiedad = tipo_propiedad.id_tipo_propiedad
        INNER JOIN public.categoria 
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        INNER JOIN public.empleado
        ON propiedad.id_empleado = empleado.id_empleado
        INNER JOIN public.inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN public.tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado 
        WHERE direccion ILIKE ? OR empleado.nombre ILIKE ? OR empleado.apellido ILIKE ? OR inquilino.nombre ILIKE ? OR inquilino.apellido ILIKE ? OR departamento ILIKE ? OR municipio ILIKE ?';
        $params = array("%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }
 
    //Metodo para la busqueda SEARCH
    //Utilizaremos los campos o (NOMBRE_TIPO)
    public function searchRowsPublic()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, 
        espacio_parqueo, descripcion, departamento.id_departamento, departamento, municipio.id_municipio, municipio, categoria.id_categoria, 
        nombre_categoria, propiedad.id_tipo_propiedad, tipo_propiedad.nombre_tipo, propiedad.id_empleado, empleado.nombre, empleado.apellido, 
        empleado.imagen, propiedad.id_inquilino, inquilino.nombre, inquilino.apellido, inquilino.imagen, propiedad.id_tipo_acabado, tipo_acabado.nombre_tipo 
        FROM public.propiedad
        INNER JOIN public.municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN public.departamento 
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN public.tipo_propiedad
        ON propiedad.id_tipo_propiedad = tipo_propiedad.id_tipo_propiedad
        INNER JOIN public.categoria 
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        INNER JOIN public.empleado
        ON propiedad.id_empleado = empleado.id_empleado
        INNER JOIN public.inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN public.tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        WHERE departamento.id_departamento =? OR municipio.id_municipio =? OR propiedad.id_tipo_propiedad =? OR categoria.id_categoria =?';
        $params = array($this->id_departamento, $this->id_municipio, $this->id_tipo_propiedad, $this->categoria);
        return Database::getRows($sql, $params);
    }

    //Metodo para la inserción INSERT
    public function createRow()
    {
        $sql = 'INSERT INTO public.propiedad  (direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, espacio_parqueo, descripcion, id_municipio, id_tipo_propiedad, id_empleado, id_inquilino,  id_tipo_acabado, imagen) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->direccion, $this->area_propiedad, $this->area_contruccion, $this->codigo, $this->precio, $this->alquiler, $this->habitaciones, $this->plantas, $this->sanitario, $this->espacio_parqueo, $this->descripcion, $this->id_municipio, $this->id_tipo_propiedad, $this->id_empleado, $this->id_inquilino, $this->id_tipo_acabado, $this->imagen);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la actualización UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE public.propiedad  
        SET direccion = ?, area_propiedad = ?, area_contruccion = ?, codigo = ?, precio = ?, alquiler = ?, habitaciones = ?, plantas = ?, sanitario = ?, espacio_parqueo = ?, descripcion = ?, id_municipio = ?, id_tipo_propiedad = ?, id_empleado = ?, id_inquilino = ?,  id_tipo_acabado = ?, imagen = ?
        WHERE id_propiedad =?';
        $params = array($this->direccion, $this->area_propiedad, $this->area_contruccion, $this->codigo, $this->precio, $this->alquiler, $this->habitaciones, $this->plantas, $this->sanitario, $this->espacio_parqueo, $this->descripcion, $this->id_municipio, $this->id_tipo_propiedad, $this->id_empleado, $this->id_inquilino, $this->id_tipo_acabado, $this->imagen, $this->id_propiedad);
        return Database::executeRow($sql, $params);
    }
    //Metodo para la eliminación DELETE 
    public function deleteRow()
    {
        $sql = 'UPDATE public.propiedad 
        SET visibilidad = false
        WHERE id_propiedad = ?';
        $params = array($this->id_propiedad);
        return Database::executeRow($sql, $params);
    }
    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAll()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, 
        espacio_parqueo, descripcion, departamento.id_departamento, departamento, municipio.id_municipio, municipio, categoria.id_categoria, 
        nombre_categoria, propiedad.id_tipo_propiedad, tipo_propiedad.nombre_tipo, propiedad.id_empleado, empleado.nombre, empleado.apellido, 
        empleado.imagen, propiedad.id_inquilino, inquilino.nombre, inquilino.apellido, inquilino.imagen, propiedad.id_tipo_acabado, 
        tipo_acabado.nombre_tipo, propiedad.imagen 
        FROM public.propiedad
        INNER JOIN public.municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN public.departamento 
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN public.tipo_propiedad
        ON propiedad.id_tipo_propiedad = tipo_propiedad.id_tipo_propiedad
        INNER JOIN public.categoria 
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        INNER JOIN public.empleado
        ON propiedad.id_empleado = empleado.id_empleado
        INNER JOIN public.inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN public.tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        WHERE propiedad.visibilidad = true' ;
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readAllIndex()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, 
        espacio_parqueo, descripcion, departamento.id_departamento, departamento, municipio.id_municipio, municipio, categoria.id_categoria, 
        nombre_categoria, propiedad.id_tipo_propiedad, tipo_propiedad.nombre_tipo, propiedad.id_empleado, empleado.nombre, empleado.apellido, 
        empleado.imagen, propiedad.id_inquilino, inquilino.nombre, inquilino.apellido, inquilino.imagen, propiedad.id_tipo_acabado, tipo_acabado.nombre_tipo 
        FROM public.propiedad
        INNER JOIN public.municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN public.departamento 
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN public.tipo_propiedad
        ON propiedad.id_tipo_propiedad = tipo_propiedad.id_tipo_propiedad
        INNER JOIN public.categoria 
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        INNER JOIN public.empleado
        ON propiedad.id_empleado = empleado.id_empleado
        INNER JOIN public.inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN public.tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        ORDER BY id_propiedad LIMIT 4';
        $params = null;
        return Database::getRows($sql, $params);
    }


    //Metodo para leer READ
    //Leer todas las filas de la Tabla
    public function readOne()
    {
        $sql = 'SELECT id_propiedad, direccion, area_propiedad, area_contruccion, codigo, precio, alquiler, habitaciones, plantas, sanitario, 
        espacio_parqueo, descripcion, departamento.id_departamento, departamento, municipio.id_municipio, municipio, categoria.id_categoria, 
        nombre_categoria, propiedad.id_tipo_propiedad, tipo_propiedad.nombre_tipo, propiedad.id_empleado, empleado.nombre, empleado.apellido, 
        empleado.imagen, propiedad.id_inquilino, inquilino.nombre, inquilino.apellido, inquilino.imagen, propiedad.id_tipo_acabado, tipo_acabado.nombre_tipo 
        FROM public.propiedad
        INNER JOIN public.municipio
        ON propiedad.id_municipio = municipio.id_municipio
        INNER JOIN public.departamento 
        ON municipio.id_departamento = departamento.id_departamento
        INNER JOIN public.tipo_propiedad
        ON propiedad.id_tipo_propiedad = tipo_propiedad.id_tipo_propiedad
        INNER JOIN public.categoria 
        ON tipo_propiedad.id_categoria = categoria.id_categoria
        INNER JOIN public.empleado
        ON propiedad.id_empleado = empleado.id_empleado
        INNER JOIN public.inquilino
        ON propiedad.id_inquilino = inquilino.id_inquilino
        INNER JOIN public.tipo_acabado
        ON propiedad.id_tipo_acabado = tipo_acabado.id_tipo_acabado
        WHERE id_propiedad =?';
        $params = array($this->id_propiedad);
        return Database::getRows($sql, $params);
    }

    //Llenar combobox
    //Combobox de departamento
    public function readDepartamento()
    {
        $sql = 'SELECT id_departamento, departamento
        FROM public.departamento';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox de municipio
    public function readMunicipio()
    {
        $sql = 'SELECT id_municipio, municipio
            FROM public.municipio';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox de tipo propiedad
    public function readTipoPropiedad()
    {
        $sql = 'SELECT id_tipo_propiedad, nombre_tipo
        FROM public.tipo_propiedad';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Combobox de categoria
    public function readCategoria()
    {
        $sql = 'SELECT id_categoria, nombre_categoria
            FROM public.categoria';
        $params = null;
        return Database::getRows($sql, $params);
    }
}
