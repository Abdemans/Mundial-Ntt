/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.mundial.Service;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.example.mundial.Repository.JugadorRepository;
import com.example.mundial.model.Jugador;

@Service
public class JugadorService {
    private final JugadorRepository repo;

    public JugadorService(JugadorRepository repo) {
        this.repo=repo;
    }
    public List<Jugador> getAllJugadores()
    {
        return repo.findAll();
    }
    public Jugador getJugadorById(String nombreJugador)
    {
        return repo.findById(nombreJugador).orElse(null);
    }
    public List<Jugador> getJugadoresByEquipo(String equipoNombre)
    {
        return repo.findJugadoresByEquipo(equipoNombre);
    }
    public Jugador saveJugador(Jugador jugador)
    {
        return repo.save(jugador);
    }
    public Jugador updateJugador(String nombrejug, Jugador jugadornew)
    {
        Jugador jugadorold=getJugadorById(nombrejug);
        jugadorold.setPuesto_hab(jugadornew.getPuesto_hab());
        jugadorold.setEquipo(jugadornew.getEquipo());
        return repo.save(jugadorold);
    }
    public void deleteJugador(String nombreEquipo)
    {
        if (!repo.existsById(nombreEquipo)) {
            throw new NoSuchElementException("Jugador no existe "+nombreEquipo);
        }
        repo.deleteById(nombreEquipo);
    } 
}
