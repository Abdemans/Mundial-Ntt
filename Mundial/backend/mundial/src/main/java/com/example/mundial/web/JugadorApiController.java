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

import com.example.mundial.Service.JugadorService;
import com.example.mundial.model.Jugador;

@RestController
@RequestMapping("/jugadores")
@CrossOrigin(origins = "http://localhost:4200") // Permite el consumo desde el puerto 4200
public class JugadorApiController {

    private final JugadorService servicio;
    
    public JugadorApiController(JugadorService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Jugador> getAllJugadores() {
        return servicio.getAllJugadores();
    }
    
    @GetMapping("/{nombreJugador}")
    public Jugador getJugadorById(@PathVariable String nombreJugador) {
        Jugador jugador = servicio.getJugadorById(nombreJugador);
        if (jugador == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Jugador no encontrado: " + nombreJugador);
        }
        return jugador;
    }

    // Corregido: Endpoint limpio, semántico y fácil de consumir desde Angular
    @GetMapping("/equipo/{nombreEquipo}")
    public List<Jugador> getJugadoresByEquipo(@PathVariable String nombreEquipo) {
        return servicio.getJugadoresByEquipo(nombreEquipo);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Jugador saveJugador(@RequestBody Jugador jugador) {
        return servicio.saveJugador(jugador);
    }

    @PutMapping("/{nombreJugador}")
    public Jugador putMethodName(@PathVariable String nombreJugador, @RequestBody Jugador jugadornew) {
        try {
            return servicio.updateJugador(nombreJugador, jugadornew);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se pudo actualizar el jugador: " + nombreJugador);
        }
    }
    
    @DeleteMapping("/{nombreJugador}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJugador(@PathVariable String nombreJugador) {
        try {
            servicio.deleteJugador(nombreJugador);
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}