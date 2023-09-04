package io.bootify.backend_gui_nodules.controller;

import io.bootify.backend_gui_nodules.entity.Registro;
import io.bootify.backend_gui_nodules.entity.Usuario;
import io.bootify.backend_gui_nodules.service.RegistroService;
import io.bootify.backend_gui_nodules.service.UsuarioService;
import io.bootify.backend_gui_nodules.vo.RespuestaServicioVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Registro")
public class RegistroController {


    private static final String origen = "*";

    @Autowired
    private RegistroService service;

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
    public @ResponseBody RespuestaServicioVO crear(@RequestBody Registro registro) {
        return service.crear(registro);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody RespuestaServicioVO actualizar(@RequestBody Registro registro) {
        return service.actualizar(registro);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO eliminar(Integer id) {
        return service.eliminar(id);
    }

}
