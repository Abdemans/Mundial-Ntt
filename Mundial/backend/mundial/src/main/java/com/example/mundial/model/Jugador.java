/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.mundial.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Jugador")
public class Jugador {
    @Id
    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "DIRECCION")
    private String direccion;

    @Column(name = "PUESTO_HAB")
    private String puesto_hab;

    @Column(name = "FECHA_NAC")
    private String fecha_nac;

@ManyToOne
@JoinColumn(name = "EQUIPO_JUGADOR", referencedColumnName = "EQUIPO")
@JsonIgnoreProperties("jugadores") // <-- AGREGA SOLO ESTO
private Equipo equipo;

    public Jugador() {
    }

    public Jugador(String nombre, String direccion, String puesto_hab, String fecha_nac, Equipo equipo) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.puesto_hab = puesto_hab;
        this.fecha_nac = fecha_nac;
        this.equipo = equipo;
    }
    
      public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getPuesto_hab() {
        return puesto_hab;
    }

    public void setPuesto_hab(String puesto_hab) {
        this.puesto_hab = puesto_hab;
    }

    public String getFecha_nac() {
        return fecha_nac;
    }

    public void setFecha_nac(String fecha_nac) {
        this.fecha_nac = fecha_nac;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

}
