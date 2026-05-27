package com.example.mundial.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="equipos")
public class Equipo {
    @Id
    @Column(name="EQUIPO")
    private String equipo;

    @Column(name="PAIS")
    private String pais;

    @Column(name="SELECCIONADOR")
    private String seleccionador;

    @OneToMany(mappedBy = "equipo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JsonManagedReference
        private List<Jugador> jugadores = new ArrayList<>(); 

    public Equipo() {
        
    }

    public Equipo(String equipo, String pais, String seleccionador) {
        this.equipo = equipo;
        this.pais = pais;
        this.seleccionador = seleccionador;
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getSeleccionador() {
        return seleccionador;
    }

    public void setSeleccionador(String seleccionador) {
        this.seleccionador = seleccionador;
    }
    public List<Jugador> getJugadores() {
        return jugadores;
    }

    public void setJugadores(List<Jugador> jugadores) {
        this.jugadores = jugadores;
    }
}
