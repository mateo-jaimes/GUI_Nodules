package io.bootify.backend_gui_nodules.controller;

import io.bootify.backend_gui_nodules.entity.Tiporegistro;
import io.bootify.backend_gui_nodules.entity.Tipousuario;
import io.bootify.backend_gui_nodules.service.TipoRegistroService;
import io.bootify.backend_gui_nodules.service.TipoUsuarioService;
import io.bootify.backend_gui_nodules.vo.RespuestaServicioVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("TipoRegistro")
public class TipoRegistroController {

    private static final String origen = "*";

    @Autowired
    private TipoRegistroService service;

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO getById(Integer id) {
        return service.getById(id);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO getAll() {
        return service.getAll();
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody RespuestaServicioVO crear(@RequestBody Tiporegistro tiporegistro) {
        return service.crear(tiporegistro);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody RespuestaServicioVO actualizar(@RequestBody Tiporegistro tiporegistro) {
        return service.actualizar(tiporegistro);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO eliminar(Integer id) {
        return service.eliminar(id);
    }


}
