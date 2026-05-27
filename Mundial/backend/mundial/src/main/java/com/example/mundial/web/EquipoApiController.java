package com.example.mundial.web;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.mundial.Service.EquiposService;
import com.example.mundial.model.Equipo;

@RestController
@RequestMapping("/equipos")
@CrossOrigin(origins = "http://localhost:4200") // Blinda la conexión con Angular
public class EquipoApiController {
    
    private final EquiposService equiposervice;
    
    // Inyección por constructor estricta
    public EquipoApiController(EquiposService equiposService) {
        this.equiposervice = equiposService;
    }

    @GetMapping
    public List<Equipo> getAll() {
        return equiposervice.getAllEquipos();
    }

    @GetMapping("/{nombreEquipo}")
    public Equipo getById(@PathVariable String nombreEquipo) {
        Equipo equipo = equiposervice.getEquipoById(nombreEquipo);
        if (equipo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipo no encontrado: " + nombreEquipo);
        }
        return equipo;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Equipo create(@RequestBody Equipo equipo) {
        return equiposervice.crearEquipo(equipo);
    }

    @PutMapping("/{nombreEquipo}")
    public Equipo update(@PathVariable String nombreEquipo, @RequestBody Equipo equipo) {
        try {
            return equiposervice.actulizar(nombreEquipo, equipo);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se pudo actualizar, no existe el equipo: " + nombreEquipo);
        }
    }

    @DeleteMapping("/{nombreEquipo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String nombreEquipo) {
        try {
            equiposervice.borrar(nombreEquipo);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}