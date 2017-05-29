package com.easy.kotlin

import org.w3c.dom.Element
import kotlin.browser.document
import kotlin.js.Date

/**
 * Created by jack on 2017/5/29.
 */
fun main(args: Array<String>) {
    val msg = "Hello World!"
    println(msg)
    js("console.log(msg)")
    js("alert(msg)")
    js("alert('KotlinJS:'+new Date())")
    js("sayTime()")
    val emailElement = getEmail()
    println(emailElement?.getAttribute("value"))
}

fun getEmail(): Element? {
    return document.getElementById("email")
}

fun sayTime() {
    println(Date())
}

fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}

fun min(a: Int, b: Int): Int {
    return if (a < b) a else b
}

fun substring(src: String, start: Int, end: Int): String {
    return src.substring(start, end)
}

fun trim(src: String): String {
    return src.trim()
}

