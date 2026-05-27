/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.example.mundial.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mundial.model.Jugador;


public interface JugadorRepository extends JpaRepository<Jugador, String> {
    List<Jugador> findJugadoresByEquipo(String equiponombre);
}
